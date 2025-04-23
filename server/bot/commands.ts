import { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } from "discord.js";
import { storage } from "../storage";
import { generateAIMessage } from "./ai";

export const commands = {
  // /ily command - sends a flower image and message
  ily: {
    data: new SlashCommandBuilder()
      .setName("ily")
      .setDescription("Send a message with flowers to show your love")
      .addStringOption(option => 
        option.setName("message")
          .setDescription("Optional custom message to include")
          .setRequired(false)),
    
    execute: async (interaction) => {
      await interaction.deferReply();
      
      try {
        const customMessage = interaction.options.getString("message");
        
        // Create embed with flower image
        const embed = new EmbedBuilder()
          .setColor(0xFF6B6B)
          .setTitle("❤️ I Love You ❤️")
          .setDescription(customMessage || "Sending you these flowers as a reminder of my love for you.")
          .setImage("https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")
          .setFooter({ text: "Sent with love" })
          .setTimestamp();
        
        await interaction.editReply({ embeds: [embed] });
      } catch (error) {
        console.error("Error executing ily command:", error);
        await interaction.editReply("Something went wrong sending your love message. Please try again later.");
      }
    }
  },
  
  // /truthordare command - truth or dare game
  truthordare: {
    data: new SlashCommandBuilder()
      .setName("truthordare")
      .setDescription("Play a game of truth or dare")
      .addStringOption(option => 
        option.setName("type")
          .setDescription("Choose truth or dare")
          .setRequired(true)
          .addChoices(
            { name: "Truth", value: "truth" },
            { name: "Dare", value: "dare" }
          ))
      .addBooleanOption(option => 
        option.setName("spicy")
          .setDescription("Include spicy questions/dares?")
          .setRequired(false)),
    
    execute: async (interaction) => {
      await interaction.deferReply({ ephemeral: true });
      
      try {
        const type = interaction.options.getString("type");
        const spicy = interaction.options.getBoolean("spicy") || false;
        
        if (type === "truth") {
          const questions = await storage.getTruthQuestions(spicy);
          
          if (!questions.length) {
            return interaction.editReply("Sorry, I don't have any truth questions at the moment.");
          }
          
          // Get a random question
          const randomIndex = Math.floor(Math.random() * questions.length);
          const question = questions[randomIndex];
          
          // Create and send embed
          const embed = new EmbedBuilder()
            .setColor(0xFFD166)
            .setTitle("🤔 Truth 🤔")
            .setDescription(question.question)
            .setFooter({ 
              text: spicy ? "Spicy question" : "Regular question"
            });
          
          await interaction.editReply({ embeds: [embed] });
          
        } else if (type === "dare") {
          const challenges = await storage.getDareChallenges(spicy);
          
          if (!challenges.length) {
            return interaction.editReply("Sorry, I don't have any dare challenges at the moment.");
          }
          
          // Get a random challenge
          const randomIndex = Math.floor(Math.random() * challenges.length);
          const challenge = challenges[randomIndex];
          
          // Create and send embed
          const embed = new EmbedBuilder()
            .setColor(0xFF6B6B)
            .setTitle("🔥 Dare 🔥")
            .setDescription(challenge.challenge)
            .setFooter({ 
              text: spicy ? "Spicy dare" : "Regular dare"
            });
          
          await interaction.editReply({ embeds: [embed] });
        }
      } catch (error) {
        console.error("Error executing truthordare command:", error);
        await interaction.editReply("Something went wrong with the truth or dare game. Please try again later.");
      }
    }
  }
};
