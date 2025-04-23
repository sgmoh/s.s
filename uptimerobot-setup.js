/**
 * UptimeRobot Setup Script for Discord Love Bot
 * 
 * This script helps you set up monitoring for your Discord Love Bot
 * to keep it running 24/7, even on free hosting platforms.
 * 
 * How to use:
 * 1. Create an account at https://uptimerobot.com
 * 2. Get your API key from the UptimeRobot dashboard
 * 3. Run this script with your API key and application URL
 */

const https = require('https');
const querystring = require('querystring');

// Replace these with your actual values
const UPTIME_ROBOT_API_KEY = 'YOUR_UPTIME_ROBOT_API_KEY';
const DISCORD_BOT_URL = 'YOUR_DEPLOYED_URL'; // Example: https://discord-love-bot.onrender.com

// Configuration for the monitor
const monitor = {
  api_key: UPTIME_ROBOT_API_KEY,
  friendly_name: 'Discord Love Bot',
  url: `${DISCORD_BOT_URL}/api/health`,
  type: 2, // HTTP(s) monitor
  interval: 5, // Check every 5 minutes
  alert_contacts: '', // You can add this later in the dashboard
};

/**
 * Create a new monitor in UptimeRobot
 */
function createMonitor() {
  const postData = querystring.stringify(monitor);
  
  const options = {
    hostname: 'api.uptimerobot.com',
    port: 443,
    path: '/v2/newMonitor',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
      'Cache-Control': 'no-cache'
    }
  };
  
  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      const response = JSON.parse(data);
      
      if (response.stat === 'ok') {
        console.log('✅ Monitor created successfully!');
        console.log(`Your Discord Love Bot at ${DISCORD_BOT_URL} is now being monitored.`);
        console.log('It will be checked every 5 minutes to ensure it stays online 24/7.');
      } else {
        console.error('❌ Failed to create monitor:', response.message || 'Unknown error');
        
        if (response.error && response.error.message) {
          console.error('Error details:', response.error.message);
        }
      }
    });
  });
  
  req.on('error', (e) => {
    console.error('❌ Error during API request:', e.message);
  });
  
  req.write(postData);
  req.end();
}

/**
 * Validate the configuration before creating the monitor
 */
function validateAndCreateMonitor() {
  if (UPTIME_ROBOT_API_KEY === 'YOUR_UPTIME_ROBOT_API_KEY') {
    console.error('❌ Please replace UPTIME_ROBOT_API_KEY with your actual API key.');
    return;
  }
  
  if (DISCORD_BOT_URL === 'YOUR_DEPLOYED_URL') {
    console.error('❌ Please replace DISCORD_BOT_URL with your actual deployed URL.');
    return;
  }
  
  console.log('Creating UptimeRobot monitor for your Discord Love Bot...');
  createMonitor();
}

// Run the script
validateAndCreateMonitor();

/**
 * UptimeRobot Setup Guide
 * 
 * 1. Sign up at https://uptimerobot.com (free tier allows 50 monitors)
 * 2. After logging in, go to "My Settings" -> "API Settings"
 * 3. Create a new "Main API Key" and copy it
 * 4. Replace 'YOUR_UPTIME_ROBOT_API_KEY' in this script with your API key
 * 5. Replace 'YOUR_DEPLOYED_URL' with the actual URL of your deployed bot
 *    (e.g., https://discord-love-bot.onrender.com)
 * 6. Run this script with: node uptimerobot-setup.js
 * 7. Check your UptimeRobot dashboard to verify the monitor was created
 * 
 * Optional: Set up notifications in the UptimeRobot dashboard to receive
 * alerts if your bot goes offline.
 */