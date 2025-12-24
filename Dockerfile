# Use Node.js LTS as base image
FROM node:20-alpine

# Install some utilities
RUN apk add --no-cache bash git

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install all dependencies (not just production)
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the app port
EXPOSE 3000

# Start in development mode with hot reload
CMD ["npm", "run", "start:dev"]
