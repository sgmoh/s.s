# Render Deployment Guide for Discord Love Bot

This guide will walk you through deploying your Discord Love Bot to Render's free tier, which is an excellent choice for personal projects like this bot.

## Prerequisites

- A [Render](https://render.com) account (free tier is sufficient)
- A GitHub account to store your code
- Your Discord Bot Token
- Your OpenAI API Key
- Discord User IDs for you and your partner

## Step 1: Prepare Your Repository

1. Fork or clone this repository to your own GitHub account
2. Make any customizations you want to the bot
3. Commit and push your changes

## Step 2: Connect Render to Your GitHub Repository

1. Sign up or log in to [Render](https://render.com)
2. From your dashboard, click "New +" and select "Web Service"
3. Connect Render to your GitHub account if you haven't already
4. Select the repository containing your Discord Love Bot

## Step 3: Configure Your Web Service

Fill in the following configuration details:

- **Name**: `discord-love-bot` (or any name you prefer)
- **Environment**: `Node`
- **Region**: Choose the closest to your location
- **Branch**: `main` (or your default branch)
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `NODE_ENV=production node dist/server/index.js`
- **Plan**: `Free`

## Step 4: Configure Environment Variables

In the "Environment" section, add the following variables:

- `NODE_ENV`: `production`
- `DISCORD_TOKEN`: Your Discord bot token
- `OPENAI_API_KEY`: Your OpenAI API key
- `HUSBAND_ID`: The Discord user ID for the husband
- `WIFE_ID`: The Discord user ID for the wife

## Step 5: Create a PostgreSQL Database

1. From your Render dashboard, click "New +" and select "PostgreSQL"
2. Configure your database:
   - **Name**: `discord-love-bot-db` (must match the name in render.yaml)
   - **Database**: `discordlovebot` (or any name you prefer)
   - **User**: Will be generated automatically
   - **Region**: Choose the same region as your web service
   - **PostgreSQL Version**: 15
   - **Plan**: Free

3. Click "Create Database"

## Step 6: Connect Your Database to Your Web Service

1. After your database is created, go to your web service settings
2. In the "Environment" section, add a new environment variable:
   - `DATABASE_URL`: Copy and paste the Internal Database URL from your PostgreSQL database page

Alternatively, you can use the `render.yaml` file included in this repository, which automatically configures both the web service and database with the correct settings.

## Step 7: Deploy Your Service

1. Click "Create Web Service"
2. Wait for the initial deployment to complete (this may take a few minutes)
3. Once deployed, your bot will be online and connected to Discord

## Step 8: Set Up UptimeRobot (Important)

Render's free tier will "spin down" your service after periods of inactivity. To keep your bot running 24/7:

1. Create an account at [UptimeRobot](https://uptimerobot.com)
2. Set up a monitor to ping your application every 5 minutes
3. Follow the instructions in the `UPTIME_SETUP_GUIDE.md` file

## Troubleshooting

### Deployment Fails

- **Check the build logs** for any errors
- Ensure all environment variables are correctly set
- Verify your Discord token and OpenAI API key are valid

### Database Connection Issues

- Check the database connection string format
- Ensure your IP is whitelisted in the database settings
- Verify that the database name and user are correct

### Bot Shows as Offline

- Inspect the application logs in Render dashboard
- Verify that the Discord token is correct and the bot has been invited to your server
- Check that the appropriate Gateway Intents are enabled in the Discord Developer Portal

## Keeping Your Bot Updated

When you make changes to your repository:

1. Commit and push your changes to GitHub
2. Render will automatically detect the changes and redeploy your service

## Monitoring Your Bot

- Use the Render dashboard to monitor your service's health, logs, and metrics
- Set up UptimeRobot alert notifications to be informed if your bot goes down
- Set up Discord alerts in your bot's code to notify you of any critical errors

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Discord.js Guide](https://discordjs.guide/)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)

With these steps, your Discord Love Bot will be deployed to Render and ready to use!