import { Client } from "discord.js";
import * as cron from "node-cron";
import { storage } from "../storage";
import { generateAIMessage } from "./ai";

let scheduledTasks = [];

export async function setupScheduler(client: Client) {
  // Clear any existing scheduled tasks
  scheduledTasks.forEach(task => task.stop());
  scheduledTasks = [];
  
  // Get scheduled messages from storage
  const messages = await storage.getScheduledMessages();
  
  for (const message of messages) {
    if (message.status !== "active") continue;
    
    // Parse time for cron
    const [hours, minutes] = message.time.split(":").map(Number);
    const cronExpression = `${minutes} ${hours} * * *`;
    
    try {
      // Create scheduled task
      const task = cron.schedule(cronExpression, async () => {
        console.log(`Running scheduled task: ${message.type} at ${message.time}`);
        
        try {
          await sendScheduledMessage(client, message);
        } catch (error) {
          console.error(`Error sending scheduled message ${message.id}:`, error);
        }
      }, {
        timezone: "Europe/London" // UK timezone
      });
      
      scheduledTasks.push(task);
      console.log(`Scheduled task created: ${message.type} at ${message.time} (${cronExpression})`);
    } catch (error) {
      console.error(`Error creating scheduled task for message ${message.id}:`, error);
    }
  }
  
  console.log(`Total scheduled tasks: ${scheduledTasks.length}`);
}

async function sendScheduledMessage(client: Client, message) {
  // Get user preferences to determine recipients
  const userPrefs = await storage.getUsersPreferences();
  const recipients = [];
  
  // Determine which users should receive the message
  if (message.recipients === "both" || message.recipients === "husband") {
    const husband = userPrefs.find(pref => pref.name === "husband");
    if (husband && shouldSendMessageToUser(husband, message.type)) {
      recipients.push(husband.discordId);
    }
  }
  
  if (message.recipients === "both" || message.recipients === "wife") {
    const wife = userPrefs.find(pref => pref.name === "wife");
    if (wife && shouldSendMessageToUser(wife, message.type)) {
      recipients.push(wife.discordId);
    }
  }
  
  if (!recipients.length) {
    console.log(`No recipients for scheduled message: ${message.type}`);
    return;
  }
  
  // Get bot config for AI settings
  const botConfig = await storage.getBotConfig();
  if (!botConfig) {
    console.error("Bot config not found");
    return;
  }
  
  // For each recipient, generate a personalized message and send it
  for (const userId of recipients) {
    try {
      const user = await client.users.fetch(userId);
      if (!user) {
        console.warn(`User not found: ${userId}`);
        continue;
      }
      
      // Get user preferences for personalization
      const userPref = userPrefs.find(pref => pref.discordId === userId);
      
      // Generate message content based on message type
      let content = "";
      
      if (message.type === "Good Morning") {
        // Generate AI message for good morning
        content = await generateAIMessage({
          messageType: "goodmorning",
          userStyle: userPref?.preferences?.messageStyle || "romantic",
          aiSettings: botConfig.aiSettings,
          apiKey: botConfig.aiApiKey
        });
      } else {
        // Default message if not good morning
        content = `Scheduled message: ${message.type}`;
      }
      
      // Send DM to user
      await user.send(content);
      
      // Log command stat
      await storage.createCommandStat({
        command: message.type.toLowerCase().replace(/\s+/g, ""),
        usedAt: new Date(),
        userId
      });
      
      console.log(`Sent scheduled message to ${userId}: ${message.type}`);
    } catch (error) {
      console.error(`Error sending message to user ${userId}:`, error);
    }
  }
}

function shouldSendMessageToUser(userPref, messageType) {
  // Check user preferences for this message type
  if (messageType === "Good Morning" && !userPref.goodMorning) {
    return false;
  }
  
  if (messageType === "Special Occasion" && !userPref.specialOccasions) {
    return false;
  }
  
  if (messageType.includes("Reminder") && !userPref.reminders) {
    return false;
  }
  
  return true;
}
