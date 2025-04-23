// API Types
export interface BotStatus {
  isOnline: boolean;
  uptime: string;
  lastRestart?: string;
}

export interface CommandUsage {
  name: string;
  count: number;
  isActive: boolean;
}

export interface AIMessage {
  count: number;
  percentage: number;
}

export interface ScheduledMessage {
  id: number;
  type: string;
  time: string;
  recipients: 'husband' | 'wife' | 'both';
  status: 'active' | 'paused';
}

export interface UserPreference {
  id: string;
  name: 'husband' | 'wife';
  preferences: {
    goodMorning: boolean;
    specialOccasions: boolean;
    reminders: boolean;
    messageStyle: 'romantic' | 'humorous' | 'motivational';
  }
}

export interface AISettings {
  model: string;
  temperature: number;
  maxTokens: number; 
  messageStyle: 'romantic' | 'funny' | 'adventurous';
}

// TruthOrDare Game Types
export interface TruthQuestion {
  id: number;
  question: string;
  isSpicy: boolean;
}

export interface DareChallenge {
  id: number;
  challenge: string;
  isSpicy: boolean;
}
