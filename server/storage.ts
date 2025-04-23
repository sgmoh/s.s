import { 
  User, 
  InsertUser, 
  BotConfig, 
  InsertBotConfig, 
  UserPreference, 
  InsertUserPreference, 
  ScheduledMessage, 
  InsertScheduledMessage, 
  TruthQuestion, 
  InsertTruthQuestion, 
  DareChallenge, 
  InsertDareChallenge, 
  CommandStat,
  InsertCommandStat 
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Bot config methods
  getBotConfig(): Promise<BotConfig | undefined>;
  createBotConfig(config: InsertBotConfig): Promise<BotConfig>;
  updateBotConfig(config: Partial<BotConfig>): Promise<BotConfig>;
  
  // User preferences methods
  getUserPreferences(discordId: string): Promise<UserPreference | undefined>;
  getUsersPreferences(): Promise<UserPreference[]>;
  createUserPreference(pref: InsertUserPreference): Promise<UserPreference>;
  updateUserPreference(discordId: string, pref: Partial<InsertUserPreference>): Promise<UserPreference>;
  
  // Scheduled messages methods
  getScheduledMessages(): Promise<ScheduledMessage[]>;
  getScheduledMessage(id: number): Promise<ScheduledMessage | undefined>;
  createScheduledMessage(message: InsertScheduledMessage): Promise<ScheduledMessage>;
  updateScheduledMessage(id: number, message: Partial<InsertScheduledMessage>): Promise<ScheduledMessage>;
  deleteScheduledMessage(id: number): Promise<boolean>;
  
  // Truth or Dare methods
  getTruthQuestions(isSpicy?: boolean): Promise<TruthQuestion[]>;
  createTruthQuestion(question: InsertTruthQuestion): Promise<TruthQuestion>;
  getDareChallenges(isSpicy?: boolean): Promise<DareChallenge[]>;
  createDareChallenge(challenge: InsertDareChallenge): Promise<DareChallenge>;
  
  // Stats methods
  getCommandStats(): Promise<CommandStat[]>;
  getCommandStatsToday(): Promise<{ command: string; count: number }[]>;
  createCommandStat(stat: InsertCommandStat): Promise<CommandStat>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private botConfig: BotConfig | undefined;
  private userPreferences: Map<string, UserPreference>;
  private scheduledMessages: Map<number, ScheduledMessage>;
  private truthQuestions: Map<number, TruthQuestion>;
  private dareChallenges: Map<number, DareChallenge>;
  private commandStats: CommandStat[];
  
  private userCounter: number;
  private prefCounter: number;
  private scheduleCounter: number;
  private truthCounter: number;
  private dareCounter: number;
  private statCounter: number;
  
  constructor() {
    this.users = new Map();
    this.userPreferences = new Map();
    this.scheduledMessages = new Map();
    this.truthQuestions = new Map();
    this.dareChallenges = new Map();
    this.commandStats = [];
    
    this.userCounter = 1;
    this.prefCounter = 1;
    this.scheduleCounter = 1;
    this.truthCounter = 1;
    this.dareCounter = 1;
    this.statCounter = 1;
    
    // Initialize with some default data
    this.initializeDefaultData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Bot config methods
  async getBotConfig(): Promise<BotConfig | undefined> {
    return this.botConfig;
  }
  
  async createBotConfig(config: InsertBotConfig): Promise<BotConfig> {
    const now = new Date();
    const newConfig: BotConfig = {
      ...config,
      id: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.botConfig = newConfig;
    return newConfig;
  }
  
  async updateBotConfig(config: Partial<BotConfig>): Promise<BotConfig> {
    if (!this.botConfig) {
      throw new Error("Bot config not found");
    }
    
    const updatedConfig: BotConfig = {
      ...this.botConfig,
      ...config,
      updatedAt: new Date(),
    };
    
    this.botConfig = updatedConfig;
    return updatedConfig;
  }

  // User preferences methods
  async getUserPreferences(discordId: string): Promise<UserPreference | undefined> {
    return this.userPreferences.get(discordId);
  }
  
  async getUsersPreferences(): Promise<UserPreference[]> {
    return Array.from(this.userPreferences.values());
  }
  
  async createUserPreference(pref: InsertUserPreference): Promise<UserPreference> {
    const id = this.prefCounter++;
    const now = new Date();
    const newPref: UserPreference = {
      ...pref,
      id,
      createdAt: now,
      updatedAt: now,
    };
    
    this.userPreferences.set(pref.discordId, newPref);
    return newPref;
  }
  
  async updateUserPreference(discordId: string, pref: Partial<InsertUserPreference>): Promise<UserPreference> {
    const existingPref = this.userPreferences.get(discordId);
    if (!existingPref) {
      throw new Error(`User preference with discordId ${discordId} not found`);
    }
    
    const updatedPref: UserPreference = {
      ...existingPref,
      ...pref,
      discordId, // Keep original ID
      updatedAt: new Date(),
    };
    
    this.userPreferences.set(discordId, updatedPref);
    return updatedPref;
  }

  // Scheduled messages methods
  async getScheduledMessages(): Promise<ScheduledMessage[]> {
    return Array.from(this.scheduledMessages.values());
  }
  
  async getScheduledMessage(id: number): Promise<ScheduledMessage | undefined> {
    return this.scheduledMessages.get(id);
  }
  
  async createScheduledMessage(message: InsertScheduledMessage): Promise<ScheduledMessage> {
    const id = this.scheduleCounter++;
    const now = new Date();
    const newMessage: ScheduledMessage = {
      ...message,
      id,
      createdAt: now,
      updatedAt: now,
    };
    
    this.scheduledMessages.set(id, newMessage);
    return newMessage;
  }
  
  async updateScheduledMessage(id: number, message: Partial<InsertScheduledMessage>): Promise<ScheduledMessage> {
    const existingMessage = this.scheduledMessages.get(id);
    if (!existingMessage) {
      throw new Error(`Scheduled message with id ${id} not found`);
    }
    
    const updatedMessage: ScheduledMessage = {
      ...existingMessage,
      ...message,
      updatedAt: new Date(),
    };
    
    this.scheduledMessages.set(id, updatedMessage);
    return updatedMessage;
  }
  
  async deleteScheduledMessage(id: number): Promise<boolean> {
    return this.scheduledMessages.delete(id);
  }

  // Truth or Dare methods
  async getTruthQuestions(isSpicy?: boolean): Promise<TruthQuestion[]> {
    const questions = Array.from(this.truthQuestions.values());
    
    if (isSpicy !== undefined) {
      return questions.filter(q => q.isSpicy === isSpicy);
    }
    
    return questions;
  }
  
  async createTruthQuestion(question: InsertTruthQuestion): Promise<TruthQuestion> {
    const id = this.truthCounter++;
    const now = new Date();
    const newQuestion: TruthQuestion = {
      ...question,
      id,
      createdAt: now,
    };
    
    this.truthQuestions.set(id, newQuestion);
    return newQuestion;
  }
  
  async getDareChallenges(isSpicy?: boolean): Promise<DareChallenge[]> {
    const challenges = Array.from(this.dareChallenges.values());
    
    if (isSpicy !== undefined) {
      return challenges.filter(c => c.isSpicy === isSpicy);
    }
    
    return challenges;
  }
  
  async createDareChallenge(challenge: InsertDareChallenge): Promise<DareChallenge> {
    const id = this.dareCounter++;
    const now = new Date();
    const newChallenge: DareChallenge = {
      ...challenge,
      id,
      createdAt: now,
    };
    
    this.dareChallenges.set(id, newChallenge);
    return newChallenge;
  }

  // Stats methods
  async getCommandStats(): Promise<CommandStat[]> {
    return this.commandStats;
  }
  
  async getCommandStatsToday(): Promise<{ command: string; count: number }[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayStats = this.commandStats.filter(
      stat => stat.usedAt >= today
    );
    
    // Group by command and count
    const commandCounts: Record<string, number> = {};
    todayStats.forEach(stat => {
      if (!commandCounts[stat.command]) {
        commandCounts[stat.command] = 0;
      }
      commandCounts[stat.command]++;
    });
    
    return Object.entries(commandCounts).map(([command, count]) => ({
      command,
      count,
    }));
  }
  
  async createCommandStat(stat: InsertCommandStat): Promise<CommandStat> {
    const id = this.statCounter++;
    const newStat: CommandStat = {
      ...stat,
      id,
    };
    
    this.commandStats.push(newStat);
    return newStat;
  }

  // Helper to initialize default data
  private initializeDefaultData() {
    // Default bot config
    this.createBotConfig({
      token: "mock-discord-token",
      aiApiKey: "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",
      wakeupTime: "07:00",
      aiSettings: {
        model: "deepseek-r1-zero",
        temperature: 0.7,
        maxTokens: 150,
        messageStyle: "romantic"
      }
    });

    // Default user preferences for husband and wife
    this.createUserPreference({
      discordId: "930131254106550333", // husband
      name: "husband",
      goodMorning: true,
      specialOccasions: true,
      reminders: false,
      messageStyle: "romantic"
    });

    this.createUserPreference({
      discordId: "772736306207129640", // wife
      name: "wife",
      goodMorning: true,
      specialOccasions: true,
      reminders: true,
      messageStyle: "humorous"
    });

    // Default scheduled messages
    this.createScheduledMessage({
      type: "Good Morning",
      time: "07:00",
      recipients: "both",
      status: "active"
    });

    this.createScheduledMessage({
      type: "Evening Check-in",
      time: "18:00",
      recipients: "both",
      status: "paused"
    });

    this.createScheduledMessage({
      type: "Weekend Fun",
      time: "10:00",
      recipients: "both",
      status: "active"
    });

    // Default truth questions
    const truthQuestions = [
      { question: "What is your favorite memory of us together?", isSpicy: false },
      { question: "What's one thing you've always wanted to try but haven't yet?", isSpicy: false },
      { question: "What was your first impression of me?", isSpicy: false },
      { question: "If you could have one super power, what would it be?", isSpicy: false },
      { question: "What's something you find attractive about me that isn't physical?", isSpicy: false },
      { question: "What's your favorite physical feature of mine?", isSpicy: true },
      { question: "What's a fantasy you've never told me about?", isSpicy: true },
      { question: "What's the wildest thing you've ever thought about doing with me?", isSpicy: true }
    ];

    truthQuestions.forEach(q => this.createTruthQuestion(q));

    // Default dare challenges
    const dareChallenges = [
      { challenge: "Send me a sweet message that makes me smile.", isSpicy: false },
      { challenge: "Do your best impression of me.", isSpicy: false },
      { challenge: "Call me and sing your favorite love song.", isSpicy: false },
      { challenge: "Draw a picture of us and send it to me.", isSpicy: false },
      { challenge: "Write me a poem in the next 5 minutes.", isSpicy: false },
      { challenge: "Send me your most attractive selfie.", isSpicy: true },
      { challenge: "Describe in detail what you'd like to do the next time we're alone.", isSpicy: true },
      { challenge: "Send me a voice message whispering what you love about our intimate time.", isSpicy: true }
    ];

    dareChallenges.forEach(d => this.createDareChallenge(d));

    // Default command stats for today
    const today = new Date();
    this.createCommandStat({ command: "ily", usedAt: today, userId: "930131254106550333" });
    this.createCommandStat({ command: "ily", usedAt: today, userId: "772736306207129640" });
    this.createCommandStat({ command: "truthordare", usedAt: today, userId: "930131254106550333" });
  }
}

export const storage = new MemStorage();
