import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const botConfig = pgTable("bot_config", {
  id: serial("id").primaryKey(),
  token: text("token").notNull(),
  aiApiKey: text("ai_api_key").notNull(),
  wakeupTime: text("wakeup_time").default("07:00").notNull(),
  aiSettings: jsonb("ai_settings").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  discordId: text("discord_id").notNull().unique(),
  name: text("name").notNull(),
  goodMorning: boolean("good_morning").default(true),
  specialOccasions: boolean("special_occasions").default(true),
  reminders: boolean("reminders").default(false),
  messageStyle: text("message_style").default("romantic"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const scheduledMessages = pgTable("scheduled_messages", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  time: text("time").notNull(),
  recipients: text("recipients").notNull(),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const truthQuestions = pgTable("truth_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  isSpicy: boolean("is_spicy").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dareChallenges = pgTable("dare_challenges", {
  id: serial("id").primaryKey(),
  challenge: text("challenge").notNull(),
  isSpicy: boolean("is_spicy").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const commandStats = pgTable("command_stats", {
  id: serial("id").primaryKey(),
  command: text("command").notNull(),
  usedAt: timestamp("used_at").defaultNow().notNull(),
  userId: text("user_id").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBotConfigSchema = createInsertSchema(botConfig).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertScheduledMessageSchema = createInsertSchema(scheduledMessages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTruthQuestionSchema = createInsertSchema(truthQuestions).omit({
  id: true,
  createdAt: true,
});

export const insertDareChallengeSchema = createInsertSchema(dareChallenges).omit({
  id: true,
  createdAt: true,
});

export const insertCommandStatSchema = createInsertSchema(commandStats).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBotConfig = z.infer<typeof insertBotConfigSchema>;
export type BotConfig = typeof botConfig.$inferSelect;

export type InsertUserPreference = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreference = typeof userPreferences.$inferSelect;

export type InsertScheduledMessage = z.infer<typeof insertScheduledMessageSchema>;
export type ScheduledMessage = typeof scheduledMessages.$inferSelect;

export type InsertTruthQuestion = z.infer<typeof insertTruthQuestionSchema>;
export type TruthQuestion = typeof truthQuestions.$inferSelect;

export type InsertDareChallenge = z.infer<typeof insertDareChallengeSchema>;
export type DareChallenge = typeof dareChallenges.$inferSelect;

export type InsertCommandStat = z.infer<typeof insertCommandStatSchema>;
export type CommandStat = typeof commandStats.$inferSelect;
