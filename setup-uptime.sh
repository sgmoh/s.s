#!/bin/bash

# Discord Love Bot - UptimeRobot Setup Script
# This script helps you set up UptimeRobot monitoring for your Discord Love Bot

# Text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${PURPLE}============================================${NC}"
echo -e "${PURPLE}    Discord Love Bot - UptimeRobot Setup    ${NC}"
echo -e "${PURPLE}============================================${NC}\n"

# Check if curl is installed
if ! command -v curl &> /dev/null; then
    echo -e "${RED}Error: curl is not installed.${NC}"
    echo -e "Please install curl first and run this script again."
    exit 1
fi

# Ask for deployed URL
echo -e "${CYAN}What is your deployed Discord Love Bot URL?${NC}"
echo -e "${YELLOW}Example: https://discord-love-bot.onrender.com${NC}"
read -p "> " DEPLOYED_URL

# Validate URL
if [[ ! $DEPLOYED_URL =~ ^https?:// ]]; then
    echo -e "${RED}Error: URL must start with http:// or https://${NC}"
    exit 1
fi

# Remove trailing slash if present
if [[ $DEPLOYED_URL == */ ]]; then
    DEPLOYED_URL=${DEPLOYED_URL%/}
fi

# Construct health endpoint URL
HEALTH_URL="${DEPLOYED_URL}/api/health"

echo -e "\n${BLUE}Testing connection to your bot's health endpoint...${NC}"

# Test health endpoint
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)

if [ $RESPONSE -eq 200 ]; then
    echo -e "${GREEN}Success! Health endpoint is responding properly.${NC}"
else
    echo -e "${YELLOW}Warning: Health endpoint returned status code $RESPONSE${NC}"
    echo -e "Your bot might not be running or the health endpoint is not configured correctly."
    echo -e "Continuing anyway, but you may need to check your deployment.\n"
fi

echo -e "\n${CYAN}To set up UptimeRobot monitoring:${NC}"
echo -e "1. Create a free account at ${BLUE}https://uptimerobot.com${NC} if you haven't already"
echo -e "2. Log into your UptimeRobot dashboard"
echo -e "3. Click 'Add New Monitor'"
echo -e "4. Select 'HTTP(s)' as the Monitor Type"
echo -e "5. Enter 'Discord Love Bot' as the Friendly Name"
echo -e "6. Enter the following URL in the URL field:"
echo -e "${GREEN}$HEALTH_URL${NC}"
echo -e "7. Set the Monitoring Interval to 5 minutes"
echo -e "8. Click 'Create Monitor'"

echo -e "\n${PURPLE}Would you like me to open the UptimeRobot dashboard for you? (y/n)${NC}"
read -p "> " OPEN_BROWSER

if [[ $OPEN_BROWSER == "y" || $OPEN_BROWSER == "Y" ]]; then
    # Try to open browser based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "https://uptimerobot.com/dashboard"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open "https://uptimerobot.com/dashboard" &> /dev/null
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        start "https://uptimerobot.com/dashboard"
    else
        echo -e "${YELLOW}Could not open browser automatically. Please visit:${NC}"
        echo -e "${BLUE}https://uptimerobot.com/dashboard${NC}"
    fi
else
    echo -e "\n${BLUE}Visit https://uptimerobot.com/dashboard to complete setup${NC}"
fi

echo -e "\n${PURPLE}============================================${NC}"
echo -e "${GREEN}Setup guide complete!${NC}"
echo -e "${PURPLE}============================================${NC}\n"

echo -e "For more detailed instructions, see the ${CYAN}UPTIME_GUIDE.md${NC} file."
echo -e "Your Discord Love Bot will now stay online 24/7!\n"