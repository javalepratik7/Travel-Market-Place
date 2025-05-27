# Use Node.js as base image
FROM node:18

# Set working directory
WORKDIR /Backend

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire application code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["node", "index.js"]
