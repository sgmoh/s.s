# Deployment Guide for Discord Love Bot

This guide will help you deploy your Discord Love Bot to a production environment. There are several options available depending on your technical comfort level and budget.

## Option 1: Deploy to Render (Recommended)

[Render](https://render.com) offers free web services that are perfect for this application.

### Prerequisites
- A Render account (free)
- Your Discord Bot Token
- Your OpenAI API Key
- Discord User IDs for you and your partner

### Steps

1. Fork or clone this repository to your GitHub account
2. Log in to [Render](https://render.com)
3. Click "New +" and select "Web Service"
4. Connect your GitHub account and select the repository
5. Configure the following settings:
   - Name: discord-love-bot (or your preferred name)
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node -r tsx/cjs server/index.ts`
6. Add the following environment variables:
   - `NODE_ENV`: production
   - `DISCORD_TOKEN`: Your Discord bot token
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `HUSBAND_ID`: The Discord user ID for the husband
   - `WIFE_ID`: The Discord user ID for the wife
7. Click "Create Web Service"

Render will automatically deploy your application and provide a URL. Your Discord bot will be connected and ready to use!

## Option 2: Deploy using Docker

If you prefer to use Docker, you can use the included Dockerfile to deploy the application.

### Prerequisites
- Docker installed on your server
- Basic knowledge of Docker and server management

### Steps

1. Clone this repository to your server
2. Build the Docker image:
   ```
   docker build -t discord-love-bot .
   ```
3. Run the container with your environment variables:
   ```
   docker run -d -p 3000:3000 \
     -e DISCORD_TOKEN=your_discord_token \
     -e OPENAI_API_KEY=your_openai_key \
     -e HUSBAND_ID=husband_discord_id \
     -e WIFE_ID=wife_discord_id \
     discord-love-bot
   ```

Your Discord bot will be running and accessible at http://your-server-ip:3000

## Option 3: Deploy to Replit

The application was built on Replit and can be easily deployed there.

### Prerequisites
- A Replit account
- Your Discord Bot Token and OpenAI API Key

### Steps

1. Fork this Repl to your account
2. Add the following secrets in the "Secrets" tool:
   - `DISCORD_TOKEN`: Your Discord bot token
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `HUSBAND_ID`: The Discord user ID for the husband
   - `WIFE_ID`: The Discord user ID for the wife
3. Click "Run" to start the application

Replit will automatically give you a URL for your application. The Discord bot will be connected and ready to use!

## Keeping Your Bot Online 24/7

### For Render
Render's free tier automatically spins down after periods of inactivity. To keep it running:
- Upgrade to a paid plan (~$7/month)
- Or set up a service like [UptimeRobot](https://uptimerobot.com/) to ping your application's health endpoint every 5 minutes

### For Docker/VPS
- Ensure your server has a good uptime and monitoring solution
- Consider using `docker-compose` with restart policies

### For Replit
- Use Replit's "Always On" feature (requires Replit Pro)
- Or set up a service like [UptimeRobot](https://uptimerobot.com/) to ping your application regularly

## Troubleshooting

If your bot is not connecting properly:
1. Check that your Discord token is correct and the bot has been invited to your server
2. Verify that the appropriate Gateway Intents are enabled in the Discord Developer Portal
3. Check the application logs for any error messages
4. Make sure your OpenAI API key is valid and has sufficient credits

For any other issues, refer to the README.md file or submit an issue on the GitHub repository.