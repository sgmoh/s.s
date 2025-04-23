# Discord Love Bot - UptimeRobot Setup Guide

## Introduction

This guide will walk you through setting up UptimeRobot to keep your Discord Love Bot running 24/7, even when deployed on free hosting platforms like Render or Replit.

## Why You Need UptimeRobot

Free hosting platforms like Render and Replit have "idle timeout" policies, which means your application will "spin down" (stop running) after a period of inactivity to save resources. This is problematic for Discord bots, which need to be running continuously to respond to commands and send scheduled messages.

UptimeRobot solves this by pinging your application at regular intervals (every 5 minutes), which prevents it from becoming idle and being shut down.

## Step-by-Step Setup Guide

### Step 1: Create an UptimeRobot Account

1. Go to [UptimeRobot.com](https://uptimerobot.com)
2. Click "Register for FREE" and create an account
3. Verify your email address

### Step 2: Set Up a Monitor Using the HTML Tool

1. After deploying your Discord Love Bot, open the `uptime-setup.html` file in your browser
2. Enter your deployed URL (e.g., `https://discord-love-bot.onrender.com`)
3. Click "Generate Monitor URL"
4. Follow the instructions to create a monitor in UptimeRobot

### Step 3: Set Up a Monitor Using the UptimeRobot Dashboard

1. Log into your UptimeRobot dashboard
2. Click "Add New Monitor"
3. For "Monitor Type", select "HTTP(s)"
4. For "Friendly Name", enter "Discord Love Bot"
5. For "URL", enter your application's health endpoint: `https://your-deployed-url.com/api/health`
6. Set the "Monitoring Interval" to 5 minutes
7. Click "Create Monitor"

### Step 4: Configure Alert Contacts (Optional but Recommended)

1. Go to "My Settings" → "Alert Contacts"
2. Click "Add Alert Contact"
3. Choose your preferred notification method (Email, SMS, etc.)
4. Enter your contact details
5. Click "Add Alert Contact"
6. Go back to your monitor settings and add this alert contact

## Using the UptimeRobot API Script (Advanced)

For advanced users who want to automate monitor creation:

1. Get your UptimeRobot API Key:
   - Log into your dashboard
   - Go to "My Settings" → "API Settings"
   - Create a "Main API Key" and copy it

2. Edit the `uptimerobot-setup.js` script:
   ```javascript
   // Replace these with your actual values
   const UPTIME_ROBOT_API_KEY = 'YOUR_UPTIME_ROBOT_API_KEY';
   const DISCORD_BOT_URL = 'YOUR_DEPLOYED_URL'; // Without the /api/health part
   ```

3. Run the script:
   ```
   node uptimerobot-setup.js
   ```

## Verifying Your Setup

1. Your monitor should show "Up" status within a few minutes
2. Check the "Response Time" graph to ensure regular pinging
3. Your Discord bot will now remain online continuously

## Troubleshooting

### Monitor Shows "Down" Status

1. Check that your bot is actually deployed and running
2. Verify the health endpoint with a browser: `https://your-deployed-url.com/api/health`
3. Ensure there are no firewalls blocking UptimeRobot's requests

### API Script Authentication Failed

1. Make sure you're using the correct API key type (Main API Key)
2. Create a new API key if necessary
3. Verify your UptimeRobot account is properly set up

## Conclusion

With UptimeRobot properly configured, your Discord Love Bot will remain online continuously, ensuring all scheduled messages, commands, and interactions work reliably, even on free hosting platforms!