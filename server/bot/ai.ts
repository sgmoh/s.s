import axios from "axios";

interface AIMessageOptions {
  messageType: string;
  userStyle: string;
  aiSettings: {
    model: string;
    temperature: number;
    maxTokens: number;
    messageStyle: string;
  };
}

export async function generateAIMessage(options: AIMessageOptions): Promise<string> {
  const { messageType, userStyle, aiSettings } = options;
  
  try {
    // Use environment variable for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY || "";
    
    // Determine prompt based on message type and styles
    let prompt = "";
    
    if (messageType === "goodmorning") {
      prompt = getGoodMorningPrompt(userStyle, aiSettings.messageStyle);
    } else {
      prompt = `Generate a ${aiSettings.messageStyle} message for my significant other.`;
    }
    
    // Make API request to OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          { role: "system", content: "You are a helpful assistant that generates loving messages for couples" },
          { role: "user", content: prompt }
        ],
        temperature: aiSettings.temperature,
        max_tokens: aiSettings.maxTokens
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        }
      }
    );
    
    // Extract and return message
    const generatedMessage = response.data.choices[0].message.content.trim();
    return generatedMessage;
  } catch (error) {
    console.error("Error generating AI message:", error);
    
    // Return fallback message if AI generation fails
    return getFallbackMessage(messageType);
  }
}

function getGoodMorningPrompt(userStyle: string, messageStyle: string): string {
  let prompt = "Generate a good morning message for my ";
  
  // Add user relationship
  prompt += "significant other. ";
  
  // Add message style preferences
  prompt += `The message should be ${messageStyle} in tone. `;
  
  // Add user style preferences
  if (userStyle === "romantic") {
    prompt += "Include romantic and affectionate language. ";
  } else if (userStyle === "humorous") {
    prompt += "Include humor and lighthearted jokes. ";
  } else if (userStyle === "motivational") {
    prompt += "Include motivational and inspiring content. ";
  }
  
  prompt += "Keep the message concise but meaningful.";
  
  return prompt;
}

function getFallbackMessage(messageType: string): string {
  if (messageType === "goodmorning") {
    return "Good morning! I hope you have a wonderful day ahead. Thinking of you with love! ❤️";
  }
  
  return "Sending you a special message to brighten your day!";
}
