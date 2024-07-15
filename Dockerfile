# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate
# Build the application
RUN npm run build

# Expose the port on which the app runs
EXPOSE 3000
 

# Start the application
CMD ["npm", "start"]