FROM node:20-alpine

WORKDIR /usr/src/app

# Install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy app files
COPY . .

EXPOSE 4000
CMD ["node", "src/index.js"]
