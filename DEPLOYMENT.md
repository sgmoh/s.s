# Deploy Sage and Salman on Replit

This guide will walk you through deploying the Sage and Salman bot on Replit, which offers a free and easy way to keep your bot running.

## Prerequisites

- A [Replit](https://replit.com) account (free tier is fine)
- Your Discord Bot Token
- Your OpenAI API Key
- Discord User IDs for you and your partner

## Step 1: Create a New Repl

1. Login to Replit and click "Create"
2. Choose "Import from GitHub" 
3. Paste your GitHub repository URL
4. Choose "Node.js" as the language
5. Click "Import from GitHub"

## Step 2: Configure Environment Variables

1. In your Repl, click on the "Secrets" (lock icon) in the Tools section
2. Add the following environment variables:
   - `DATABASE_URL`: The PostgreSQL connection URL (provided by Replit)
   - `DISCORD_TOKEN`: Your Discord bot token
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `HUSBAND_ID`: Discord user ID for the husband
   - `WIFE_ID`: Discord user ID for the wife

## Step 3: Set Up the Database

1. Click on "Database" in the Tools section to create a PostgreSQL database
2. After your database is created, Replit will automatically add the `DATABASE_URL` secret
3. Run the database migrations:
   ```bash
   npm run db:push
   ```

## Step 4: Configure the Run Command

1. Update the "Run" button configuration in `.replit`:
   ```
   run = "npm run dev"
   ```

2. Alternatively, you can create a new file called `.replit` with the following content:
   ```
   run = "npm run dev"
   language = "nodejs"
   onBoot = "npm install"
   ```

## Step 5: Run Your Bot

1. Click the "Run" button to start your bot
2. Check the console for any errors
3. Verify that your bot appears online in Discord

## Step 6: Keep Your Bot Running 24/7

Replit's free tier will "sleep" your application after a period of inactivity. To keep your bot running continuously:

1. Set up UptimeRobot to ping your application regularly:
   - Follow the instructions in `UPTIME_SETUP_GUIDE.md`
   - Use your Replit URL + `/api/health` as the endpoint to monitor

2. For the URL to monitor, use:
   ```
   https://your-repl-name.your-username.repl.co/api/health
   ```

## Troubleshooting

### Bot Goes Offline

If your bot goes offline after some time:
1. Ensure UptimeRobot is properly configured
2. Check that your Replit is not hitting resource limits
3. Verify there are no errors in the console logs

### Database Connection Issues

1. Make sure the `DATABASE_URL` secret is correctly set
2. Try resetting the database through the Replit UI
3. Run the migrations again with `npm run db:push`

### Discord Integration Issues

1. Verify your Discord bot token is valid
2. Ensure the bot has been invited to your server with the correct permissions
3. Check that the appropriate Gateway Intents are enabled in the Discord Developer Portal

## Updating Your Bot

To update your bot on Replit:

1. Make changes to your GitHub repository
2. In Replit, go to the "Version Control" tab
3. Click "Pull" to get the latest changes
4. Click "Run" to restart your bot with the updates

## Additional Resources

- [Replit Documentation](https://docs.replit.com/)
- [Discord.js Guide](https://discordjs.guide/)
- [UptimeRobot Documentation](https://uptimerobot.com/help/)

With these steps, your Sage and Salman bot will be deployed to Replit and ready to use!