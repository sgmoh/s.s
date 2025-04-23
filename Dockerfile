
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build

CMD ["node", "dist/index.js"]
