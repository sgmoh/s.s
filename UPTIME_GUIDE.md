# UptimeRobot Setup Guide for Discord Love Bot

This guide will help you set up UptimeRobot to keep your Discord Love Bot running 24/7, even when deployed on free hosting platforms like Render or Replit that have idle timeouts.

## Why UptimeRobot?

Free hosting services often "spin down" your application after a period of inactivity to save resources. This means your Discord bot might go offline when not actively being used. UptimeRobot solves this by regularly pinging your application, keeping it active and preventing it from going to sleep.

## Step 1: Create an UptimeRobot Account

1. Go to [UptimeRobot.com](https://uptimerobot.com)
2. Click "Register for FREE" and create an account
3. Verify your email address

## Step 2: Create a Monitor for Your Discord Love Bot

You have multiple options to set up UptimeRobot monitoring:

### Option A: Using the Setup Helper Page (Recommended)

1. Open the `uptime-setup.html` file in your browser
2. Enter your deployed Discord Love Bot URL
3. Click "Generate Monitor URL"
4. Follow the on-screen instructions to complete setup in UptimeRobot

### Option B: Using the Setup Script

1. Open a terminal or command prompt
2. Make the script executable: `chmod +x setup-uptime.sh`
3. Run the script: `./setup-uptime.sh`
4. Follow the interactive prompts
5. The script will test your health endpoint and provide UptimeRobot setup instructions

### Option C: Using the UptimeRobot Dashboard Manually

1. Log into your UptimeRobot dashboard
2. Click "Add New Monitor"
3. Select "HTTP(s)" as the Monitor Type
4. Enter a Friendly Name (e.g., "Discord Love Bot")
5. Enter your application's health check URL:
   - Format: `https://your-deployed-url.com/api/health`
   - Example: `https://discord-love-bot.onrender.com/api/health`
6. Set the Monitoring Interval to 5 minutes
7. Click "Create Monitor"

### Option D: Using the API Script

1. Open the `uptimerobot-setup.js` file in this repository
2. Get your UptimeRobot API Key:
   - Log into your UptimeRobot dashboard
   - Go to "My Settings" → "API Settings"
   - Create a "Main API Key" and copy it
3. Edit the script to replace:
   - `YOUR_UPTIME_ROBOT_API_KEY` with your actual API key
   - `YOUR_DEPLOYED_URL` with your application's URL (without the /api/health part)
4. Run the script:
   ```
   node uptimerobot-setup.js
   ```
5. Check your UptimeRobot dashboard to verify the monitor was created

## Step 3: Set Up Notifications (Optional but Recommended)

Receive alerts if your bot goes offline:

1. In your UptimeRobot dashboard, go to "My Settings" → "Alert Contacts"
2. Click "Add Alert Contact"
3. Choose your preferred notification method (Email, SMS, etc.)
4. Enter your contact details
5. Click "Add Alert Contact"
6. Go back to "Monitors" and edit your Discord Love Bot monitor
7. Click "Alert Contacts" and select your newly created contact
8. Click "Save"

## Step 4: Verify Monitoring is Working

1. In your UptimeRobot dashboard, find your Discord Love Bot monitor
2. After a few minutes, you should see its status change to "Up"
3. The "Response Time" graph should show regular activity every 5 minutes

## Troubleshooting

### Monitor Shows "Down" Status

1. Verify your bot is deployed and running correctly
2. Check that the health check endpoint is working:
   - Visit `https://your-deployed-url.com/api/health` in your browser
   - You should see a JSON response: `{"status":"ok","timestamp":"..."}`
3. Ensure there are no firewalls blocking UptimeRobot's requests
4. If using Render, make sure you haven't exceeded your free tier limits

### Script Error: "Authentication Failed"

1. Make sure you're using the correct API key type (Main API Key)
2. Create a new API key if necessary and try again
3. Check if your UptimeRobot account has been verified

## Best Practices

1. **Set up multiple monitors** for critical applications - perhaps one for the health check and another for the main page
2. **Configure alerting** to be notified quickly if your bot goes down
3. **Check your dashboard weekly** to ensure everything is running smoothly
4. **Consider upgrading** to a paid hosting plan if your bot becomes essential

With UptimeRobot properly configured, your Discord Love Bot will stay online continuously, ensuring your scheduled messages, greetings, and commands are always available for you and your partner!