// These values can be configured in the Setup page
export const HUSBAND_ID = "YOUR_HUSBAND_ID";
export const WIFE_ID = "YOUR_WIFE_ID";
export const DEFAULT_WAKE_TIME = "07:00";
export const DEFAULT_TOKEN = "YOUR_DISCORD_TOKEN";
export const DEFAULT_AI_KEY = "YOUR_OPENAI_API_KEY";

export const AI_MODELS = [
  { id: "gpt-4o", name: "GPT-4o (Recommended)" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo (Faster)" },
  { id: "gpt-4", name: "GPT-4 (Original)" }
];

export const MESSAGE_STYLES = [
  { id: "romantic", name: "Romantic" },
  { id: "funny", name: "Funny" },
  { id: "sweet", name: "Sweet" },
  { id: "poetic", name: "Poetic" },
  { id: "adventurous", name: "Adventurous" }
];

export const SCHEDULED_MESSAGES = [
  { id: 1, type: "Good Morning", time: "07:00", recipients: "both", status: "active" },
  { id: 2, type: "Evening Check-in", time: "18:00", recipients: "both", status: "paused" },
  { id: 3, type: "Weekend Fun", time: "10:00", recipients: "both", status: "active" }
];

export const FLOWER_IMAGE_URL = "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80";
