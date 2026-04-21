# Base image — Node.js 18
FROM node:18-alpine

# Working directory set karo container mein
WORKDIR /app

# package.json pehle copy karo (caching ke liye)
COPY package*.json ./

# Dependencies install karo
RUN npm install --production

# Baaki sab copy karo
COPY . .

# Port expose karo
EXPOSE 5000

# Server start karo
CMD ["node", "server.js"]