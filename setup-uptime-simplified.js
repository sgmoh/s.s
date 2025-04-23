#!/usr/bin/env node

/**
 * Sage and Salman - UptimeRobot Setup Helper
 * 
 * This simplified script helps you set up UptimeRobot monitoring
 * to keep your Sage and Salman bot running 24/7.
 */

const readline = require('readline');
const https = require('https');
const querystring = require('querystring');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for nicer output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  purple: '\x1b[35m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

// Print welcome message
console.log(`\n${colors.purple}===============================================${colors.reset}`);
console.log(`${colors.purple}    Sage and Salman - UptimeRobot Setup Helper    ${colors.reset}`);
console.log(`${colors.purple}===============================================${colors.reset}\n`);

console.log(`This script will help you set up UptimeRobot monitoring to keep`);
console.log(`your Sage and Salman bot running 24/7, even on free hosting.\n`);

// Ask for deployed URL
function askForDeployedUrl() {
  rl.question(`${colors.cyan}What is your deployed Sage and Salman URL?${colors.reset}\n${colors.yellow}Example: https://sage-and-salman.onrender.com${colors.reset}\n> `, (deployedUrl) => {
    // Basic URL validation
    if (!deployedUrl.startsWith('http://') && !deployedUrl.startsWith('https://')) {
      console.log(`\n${colors.red}Error: URL must start with http:// or https://${colors.reset}`);
      return askForDeployedUrl();
    }

    // Remove trailing slash if present
    if (deployedUrl.endsWith('/')) {
      deployedUrl = deployedUrl.slice(0, -1);
    }

    // Construct health endpoint URL
    const healthUrl = `${deployedUrl}/api/health`;
    
    console.log(`\n${colors.green}Generated health endpoint URL:${colors.reset} ${healthUrl}`);
    
    // Check if the health endpoint is accessible
    console.log(`\n${colors.blue}Testing connection to health endpoint...${colors.reset}`);
    testHealthEndpoint(healthUrl, () => askForUptimeRobotKey(healthUrl));
  });
}

// Test the health endpoint
function testHealthEndpoint(url, callback) {
  const options = new URL(url);
  
  const req = https.request(options, (res) => {
    if (res.statusCode === 200) {
      console.log(`${colors.green}Success! Health endpoint is accessible.${colors.reset}`);
      callback();
    } else {
      console.log(`${colors.yellow}Warning: Health endpoint returned status code ${res.statusCode}${colors.reset}`);
      console.log(`Your bot might not be running or the endpoint is not configured correctly.`);
      askToContinue(callback);
    }
  });
  
  req.on('error', (e) => {
    console.log(`${colors.red}Error: Could not connect to health endpoint.${colors.reset}`);
    console.log(`Error details: ${e.message}`);
    askToContinue(callback);
  });
  
  req.end();
}

// Ask if user wants to continue despite errors
function askToContinue(callback) {
  rl.question(`\n${colors.yellow}Do you want to continue anyway? (y/n)${colors.reset}\n> `, (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      callback();
    } else {
      console.log(`\n${colors.red}Setup aborted. Please make sure your bot is deployed and running.${colors.reset}`);
      rl.close();
    }
  });
}

// Ask for UptimeRobot API key or offer manual setup
function askForUptimeRobotKey(healthUrl) {
  console.log(`\n${colors.cyan}Do you have an UptimeRobot API key? (y/n)${colors.reset}`);
  rl.question('> ', (hasKey) => {
    if (hasKey.toLowerCase() === 'y' || hasKey.toLowerCase() === 'yes') {
      rl.question(`\n${colors.cyan}Enter your UptimeRobot API key:${colors.reset}\n> `, (apiKey) => {
        if (apiKey.trim() === '') {
          console.log(`\n${colors.red}Error: API key cannot be empty.${colors.reset}`);
          askForUptimeRobotKey(healthUrl);
        } else {
          createMonitorWithApi(apiKey, healthUrl);
        }
      });
    } else {
      provideManualInstructions(healthUrl);
    }
  });
}

// Create monitor using the UptimeRobot API
function createMonitorWithApi(apiKey, healthUrl) {
  console.log(`\n${colors.blue}Creating UptimeRobot monitor...${colors.reset}`);
  
  const monitor = {
    api_key: apiKey,
    friendly_name: 'Sage and Salman',
    url: healthUrl,
    type: 2, // HTTP(s) monitor
    interval: 5 // Check every 5 minutes
  };
  
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
      try {
        const response = JSON.parse(data);
        
        if (response.stat === 'ok') {
          console.log(`\n${colors.green}✅ Monitor created successfully!${colors.reset}`);
          console.log(`Your Sage and Salman bot at ${healthUrl} is now being monitored.`);
          console.log(`It will be checked every 5 minutes to ensure it stays online 24/7.`);
          showNextSteps();
        } else {
          console.log(`\n${colors.red}❌ Failed to create monitor:${colors.reset} ${response.message || 'Unknown error'}`);
          
          if (response.error && response.error.message) {
            console.log(`Error details: ${response.error.message}`);
          }
          
          provideManualInstructions(healthUrl);
        }
      } catch (e) {
        console.log(`\n${colors.red}❌ Error parsing response:${colors.reset} ${e.message}`);
        provideManualInstructions(healthUrl);
      }
    });
  });
  
  req.on('error', (e) => {
    console.log(`\n${colors.red}❌ Error during API request:${colors.reset} ${e.message}`);
    provideManualInstructions(healthUrl);
  });
  
  req.write(postData);
  req.end();
}

// Provide manual setup instructions
function provideManualInstructions(healthUrl) {
  console.log(`\n${colors.cyan}To set up UptimeRobot manually:${colors.reset}`);
  console.log(`1. Create a free account at ${colors.blue}https://uptimerobot.com${colors.reset} if you haven't already`);
  console.log(`2. Log into your UptimeRobot dashboard`);
  console.log(`3. Click "Add New Monitor"`);
  console.log(`4. Select "HTTP(s)" as the Monitor Type`);
  console.log(`5. Enter "Sage and Salman" as the Friendly Name`);
  console.log(`6. Enter the following URL in the URL field:`);
  console.log(`   ${colors.green}${healthUrl}${colors.reset}`);
  console.log(`7. Set the Monitoring Interval to 5 minutes`);
  console.log(`8. Click "Create Monitor"`);
  
  showNextSteps();
}

// Show next steps
function showNextSteps() {
  console.log(`\n${colors.purple}===============================================${colors.reset}`);
  console.log(`${colors.green}Setup complete!${colors.reset}`);
  console.log(`${colors.purple}===============================================${colors.reset}\n`);
  
  console.log(`${colors.cyan}Next steps:${colors.reset}`);
  console.log(`1. Set up alert contacts in UptimeRobot to be notified if your bot goes down`);
  console.log(`2. Check your UptimeRobot dashboard to verify the monitor status`);
  console.log(`3. For more detailed instructions, see the ${colors.blue}UPTIME_SETUP_GUIDE.md${colors.reset} file\n`);
  
  rl.close();
}

// Start the script
askForDeployedUrl();

// Handle exit
rl.on('close', () => {
  console.log(`\nThank you for using the Sage and Salman UptimeRobot Setup Helper!`);
  process.exit(0);
});