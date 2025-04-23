# Discord Love Bot

A personalized Discord bot for couples that sends scheduled messages, plays truth or dare, and uses AI to generate playful content. Perfect for keeping the romance alive across distance!

## Features

- 💕 **Personalized Messages**: Send love notes, compliments, and sweet messages to your partner with the `/ily` command
- 🎮 **Truth or Dare Game**: Play truth or dare with regular and "spicy" options
- 🤖 **AI-Generated Content**: Uses OpenAI to create unique, personalized content
- ⏰ **Scheduled Messages**: Automated greetings and reminders based on UK time
- 🎯 **User-Specific Preferences**: Configure different message styles for each partner

## Getting Started

### 1. Create a Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a "New Application" and give it a name
3. Go to the "Bot" tab and click "Add Bot"
4. Under the TOKEN section, click "Reset Token" and copy your token
5. Enable the following Privileged Gateway Intents:
   - Presence Intent
   - Server Members Intent
   - Message Content Intent
6. In the "OAuth2" → "URL Generator" tab, select scopes: "bot" and "applications.commands"
7. For bot permissions, select: "Send Messages", "Embed Links", and "Use Slash Commands"
8. Copy the generated URL and open it to invite the bot to your server

### 2. Get Your OpenAI API Key

1. Create an account at [OpenAI](https://platform.openai.com/)
2. Go to the [API Keys page](https://platform.openai.com/api-keys)
3. Create a new secret key

### 3. Setup Your Love Bot

1. Clone this template or fork it to your own Replit account
2. Go to the "Setup" page in the web interface
3. Enter your Discord Bot Token, OpenAI API Key, and Discord User IDs
4. Configure your preferred AI model and message style
5. Optionally add custom truth questions and dare challenges
6. Click "Complete Setup" to save your configuration

### 4. Find Discord IDs

To find your Discord ID:

1. Open Discord and go to Settings
2. Go to "Advanced" and enable "Developer Mode"
3. Right-click on your username and select "Copy ID"
4. Do the same for your partner's username

## Commands

The Discord Love Bot comes with several slash commands:

- `/ily` - Sends a loving message with a flower image
- `/truthordare [spicy]` - Play truth or dare (add "spicy" for more intimate questions)
- `/goodmorning` - Send a good morning message (can also be scheduled)

## Scheduling

The bot includes pre-configured scheduled messages:

- **Good Morning** - Sends at 07:00 AM (UK time)
- **Weekend Fun** - Sends at 10:00 AM (UK time) on weekends
- **Evening Check-in** - Sends at 6:00 PM (UK time)

You can customize these schedules in the "Schedule" page of the web interface.

## Customization

- **AI Settings** - Change the AI model, temperature, and message style
- **User Preferences** - Configure each partner's preferences for types of messages
- **Custom Content** - Add your own truth questions and dare challenges

## Development

This project is built with:

- **Frontend**: React, TailwindCSS, shadcn/ui
- **Backend**: Express, Discord.js
- **AI**: OpenAI API
- **Data Storage**: In-memory storage (no database setup required)

## License

MIT License - Feel free to modify and use for your personal relationship!

## Support

If you encounter any issues or have questions:

1. Check the "Help" section in the web interface
2. Submit an issue on the GitHub repository
3. Reach out to the creator on Discord

---

Created with ❤️ for couples everywhere. May your love grow stronger with each message!