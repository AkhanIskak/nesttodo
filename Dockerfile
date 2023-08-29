# Base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire project
COPY . .

# Build the project
RUN npm run build
# Expose the port your Nest.js application listens on
EXPOSE 3000

# Run the Nest.js application
CMD [ "NODE_ENV=production node", "dist/main" ]
