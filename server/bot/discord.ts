import { Client, GatewayIntentBits, Events, REST, Routes } from "discord.js";
import { storage } from "../storage";
import { commands } from "./commands";
import { setupScheduler } from "./scheduler";

let client: Client;

export async function setupDiscordBot() {
  // Use environment variable for Discord token
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    console.error("Discord token not found in environment variables");
    return;
  }
  
  console.log("Setting up Discord bot with token:", token.substring(0, 5) + "..." + token.substring(token.length - 5));

  // Create a new Discord client
  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
    ]
  });

  // Register slash commands with Discord API
  const rest = new REST({ version: '10' }).setToken(token);
  const commandData = Object.values(commands).map(command => command.data.toJSON());
  
  // Event: Bot is ready
  client.once(Events.ClientReady, async (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    
    // Register commands with the correct client ID
    try {
      // Register commands for specific guilds for faster testing
      const guilds = await client.guilds.fetch();
      let registeredInAnyGuild = false;
      
      // Register commands in all guilds the bot is in
      for (const [guildId, _] of guilds) {
        try {
          await rest.put(
            Routes.applicationGuildCommands(c.user.id, guildId),
            { body: commandData },
          );
          console.log(`Successfully registered commands for guild ${guildId}`);
          registeredInAnyGuild = true;
        } catch (guildError) {
          console.error(`Error registering commands for guild ${guildId}:`, guildError);
        }
      }
      
      if (registeredInAnyGuild) {
        console.log('Successfully registered application (/) commands in guilds.');
        console.log('Guild commands are available immediately (no 1-hour wait).');
      } else {
        console.log('Failed to register commands in any guild. Trying global registration...');
        // Fallback to global commands
        await rest.put(
          Routes.applicationCommands(c.user.id),
          { body: commandData },
        );
        console.log('Successfully registered global application (/) commands.');
        console.log('Note: Global commands can take up to an hour to propagate across all servers.');
      }
    } catch (error) {
      console.error('Error registering slash commands:', error);
    }
    
    // Setup scheduler for timed messages
    setupScheduler(client);
  });

  // Event: Interaction received (slash commands)
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;
    
    const commandName = interaction.commandName;
    const command = commands[commandName as keyof typeof commands];
    if (!command) return;
    
    try {
      await command.execute(interaction);
      
      // Log command usage
      await storage.createCommandStat({
        command: commandName,
        usedAt: new Date(),
        userId: interaction.user.id
      });
    } catch (error) {
      console.error(`Error executing command ${commandName}:`, error);
      
      // Reply with error if the interaction can still be responded to
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ 
          content: 'There was an error executing this command!',
          ephemeral: true 
        });
      } else {
        await interaction.reply({ 
          content: 'There was an error executing this command!',
          ephemeral: true 
        });
      }
    }
  });

  // Log in to Discord with the bot token
  try {
    await client.login(token);
  } catch (error) {
    console.error('Error logging in to Discord:', error);
    console.log('This is likely due to an invalid token or network issues.');
    console.log('The bot will continue to run, but Discord features will be unavailable.');
  }
}

export function getDiscordClient(): Client | undefined {
  return client;
}
