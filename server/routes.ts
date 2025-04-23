import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserPreferencesSchema, 
  insertScheduledMessageSchema 
} from "@shared/schema";
import { setupDiscordBot } from "./bot/discord";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize HTTP server
  const httpServer = createServer(app);

  // API Routes - prefixed with /api
  
  // Stats routes
  app.get("/api/stats/commands", async (req, res) => {
    try {
      const stats = await storage.getCommandStatsToday();
      const totalCount = stats.reduce((acc, stat) => acc + stat.count, 0);
      res.json({
        count: totalCount,
        percentage: totalCount > 0 ? 70 : 0, // Mock percentage for progress bar
        stats
      });
    } catch (error) {
      console.error("Error getting command stats:", error);
      res.status(500).json({ message: "Failed to fetch command stats" });
    }
  });

  app.get("/api/stats/ai", async (req, res) => {
    try {
      // Count AI-generated messages (good morning messages are AI)
      const aiMessages = (await storage.getCommandStats()).filter(
        stat => stat.command === "goodmorning"
      );
      res.json({
        count: aiMessages.length,
        percentage: aiMessages.length > 0 ? 60 : 0 // Mock percentage for progress bar
      });
    } catch (error) {
      console.error("Error getting AI message stats:", error);
      res.status(500).json({ message: "Failed to fetch AI message stats" });
    }
  });

  // Bot commands routes
  app.get("/api/commands", async (req, res) => {
    try {
      const stats = await storage.getCommandStatsToday();
      const commands = [
        {
          name: "ily",
          usage: stats.find(s => s.command === "ily")?.count || 0,
          isActive: true
        },
        {
          name: "truthordare",
          usage: stats.find(s => s.command === "truthordare")?.count || 0,
          isActive: true
        },
        {
          name: "goodmorning",
          usage: stats.find(s => s.command === "goodmorning")?.count || 0,
          isActive: true
        }
      ];
      res.json(commands);
    } catch (error) {
      console.error("Error getting commands:", error);
      res.status(500).json({ message: "Failed to fetch commands" });
    }
  });

  // User preferences routes
  app.get("/api/users/preferences", async (req, res) => {
    try {
      const prefs = await storage.getUsersPreferences();
      res.json(prefs);
    } catch (error) {
      console.error("Error getting user preferences:", error);
      res.status(500).json({ message: "Failed to fetch user preferences" });
    }
  });

  app.put("/api/users/:id/preferences", async (req, res) => {
    try {
      const { id } = req.params;
      const updateSchema = insertUserPreferencesSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      const updatedPrefs = await storage.updateUserPreference(id, validatedData);
      res.json(updatedPrefs);
    } catch (error) {
      console.error("Error updating user preferences:", error);
      res.status(500).json({ message: "Failed to update user preferences" });
    }
  });

  // Schedule routes
  app.get("/api/schedules", async (req, res) => {
    try {
      const schedules = await storage.getScheduledMessages();
      res.json(schedules);
    } catch (error) {
      console.error("Error getting scheduled messages:", error);
      res.status(500).json({ message: "Failed to fetch scheduled messages" });
    }
  });

  app.post("/api/schedules", async (req, res) => {
    try {
      const scheduleSchema = insertScheduledMessageSchema;
      const validatedData = scheduleSchema.parse(req.body);
      const newSchedule = await storage.createScheduledMessage(validatedData);
      res.status(201).json(newSchedule);
    } catch (error) {
      console.error("Error creating scheduled message:", error);
      res.status(500).json({ message: "Failed to create scheduled message" });
    }
  });

  app.patch("/api/schedules/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const scheduleId = parseInt(id, 10);
      const updateSchema = insertScheduledMessageSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      const updatedSchedule = await storage.updateScheduledMessage(scheduleId, validatedData);
      res.json(updatedSchedule);
    } catch (error) {
      console.error("Error updating scheduled message:", error);
      res.status(500).json({ message: "Failed to update scheduled message" });
    }
  });

  app.delete("/api/schedules/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const scheduleId = parseInt(id, 10);
      await storage.deleteScheduledMessage(scheduleId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting scheduled message:", error);
      res.status(500).json({ message: "Failed to delete scheduled message" });
    }
  });

  // AI settings routes
  app.get("/api/ai/settings", async (req, res) => {
    try {
      const config = await storage.getBotConfig();
      if (!config) {
        return res.status(404).json({ message: "Bot configuration not found" });
      }
      
      res.json(config.aiSettings);
    } catch (error) {
      console.error("Error getting AI settings:", error);
      res.status(500).json({ message: "Failed to fetch AI settings" });
    }
  });

  app.put("/api/ai/settings", async (req, res) => {
    try {
      const config = await storage.getBotConfig();
      if (!config) {
        return res.status(404).json({ message: "Bot configuration not found" });
      }
      
      const updatedConfig = await storage.updateBotConfig({
        aiSettings: req.body
      });
      
      res.json(updatedConfig.aiSettings);
    } catch (error) {
      console.error("Error updating AI settings:", error);
      res.status(500).json({ message: "Failed to update AI settings" });
    }
  });

  // Truth or Dare routes
  app.get("/api/truthordare/truth", async (req, res) => {
    try {
      const isSpicy = req.query.spicy === "true";
      const questions = await storage.getTruthQuestions(isSpicy);
      
      if (!questions.length) {
        return res.status(404).json({ message: "No truth questions found" });
      }
      
      // Pick a random question
      const randomIndex = Math.floor(Math.random() * questions.length);
      res.json(questions[randomIndex]);
    } catch (error) {
      console.error("Error getting truth question:", error);
      res.status(500).json({ message: "Failed to fetch truth question" });
    }
  });

  app.get("/api/truthordare/dare", async (req, res) => {
    try {
      const isSpicy = req.query.spicy === "true";
      const challenges = await storage.getDareChallenges(isSpicy);
      
      if (!challenges.length) {
        return res.status(404).json({ message: "No dare challenges found" });
      }
      
      // Pick a random challenge
      const randomIndex = Math.floor(Math.random() * challenges.length);
      res.json(challenges[randomIndex]);
    } catch (error) {
      console.error("Error getting dare challenge:", error);
      res.status(500).json({ message: "Failed to fetch dare challenge" });
    }
  });

  // Setup Discord bot
  try {
    await setupDiscordBot();
  } catch (error) {
    console.error("Error setting up Discord bot:", error);
  }

  return httpServer;
}
