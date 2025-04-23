# Discord Love Bot

A Discord bot designed to help couples stay connected and strengthen their relationship, even when physically apart. This bot provides personalized messages, reminders, games, and AI-powered romantic interactions.

## Features

- **Personalized Messages**: Schedule good morning messages, reminders, and special occasion notes
- **Truth or Dare Game**: Play a customized truth or dare game with your partner
- **AI-Generated Content**: Leverages OpenAI to create personalized romantic messages
- **Schedule Management**: Set up recurring messages at specific times
- **User Preferences**: Each partner can customize their message preferences
- **Dashboard**: Web interface to manage all settings and monitor bot status

## Technology Stack

- **Frontend**: React, TailwindCSS, shadcn/ui components
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Bot**: Discord.js
- **AI**: OpenAI API
- **Deployment**: Configured for easy deployment on Render

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Discord bot token
- OpenAI API key
- Discord User IDs for both partners

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/discord-love-bot.git
   cd discord-love-bot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/discordlovebot
   DISCORD_TOKEN=your_discord_bot_token
   OPENAI_API_KEY=your_openai_api_key
   HUSBAND_ID=discord_user_id_for_husband
   WIFE_ID=discord_user_id_for_wife
   ```

4. Set up the database:
   ```
   npm run db:push
   ```

5. Start the development server:
   ```
   npm run dev
   ```

### Discord Bot Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" tab and create a bot
4. Enable the following Privileged Gateway Intents:
   - Server Members Intent
   - Message Content Intent
   - Presence Intent
5. Copy the bot token to your `.env` file
6. Generate an invite URL from the OAuth2 URL Generator:
   - Select "bot" and "applications.commands" scopes
   - Select appropriate bot permissions (Send Messages, Read Messages, etc.)
7. Invite the bot to your server using the generated URL

## Usage

### Dashboard

Access the web dashboard at `http://localhost:5000` to:
- Monitor bot status
- Configure scheduled messages
- Customize user preferences
- View command usage statistics
- Adjust AI settings

### Discord Commands

The bot supports the following slash commands:
- `/gm`: Send a good morning message
- `/tod`: Play Truth or Dare
- `/truth`: Ask a truth question
- `/dare`: Give a dare challenge
- `/love`: Send a romantic message
- `/help`: Display available commands

## Deployment

See the following guides for deployment instructions:
- [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md) - Deploy to Render
- [UPTIME_SETUP_GUIDE.md](UPTIME_SETUP_GUIDE.md) - Set up UptimeRobot for 24/7 uptime

## Configuration

### User Settings

Each partner can configure their preferences:
- Good morning messages
- Special occasion reminders
- General reminders
- Message style (romantic, humorous, motivational)

### AI Settings

Customize the AI behavior:
- Model selection (GPT-3.5-turbo or GPT-4)
- Temperature (creativity level)
- Maximum tokens
- Message style

### Scheduled Messages

Configure recurring messages with:
- Type (Good Morning, Weekend Fun, etc.)
- Time (in 24-hour format)
- Recipients (husband, wife, or both)
- Status (active or paused)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Discord.js](https://discord.js.org/) for the Discord API integration
- [OpenAI](https://openai.com/) for the AI capabilities
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Drizzle ORM](https://orm.drizzle.team/) for database management
- [Render](https://render.com/) for hosting recommendations