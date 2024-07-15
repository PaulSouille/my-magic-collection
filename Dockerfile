# Use the official Node.js 18 image as the base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set up SQLite database for Prisma during build
COPY prisma/schema.prisma ./prisma/
RUN echo 'DATABASE_URL="file:./dev.db"' > .env

# Generate Prisma client using SQLite
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Use a lightweight web server to serve the app
FROM node:18-alpine AS production

# Set environment variables
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the build output and Prisma client from the previous stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=base /app/prisma ./prisma

# Copy the SQLite schema (this won't be used in production but is needed for Prisma)
COPY --from=base /app/dev.db ./dev.db

# Remove the temporary .env file
RUN rm .env

# Set environment variable for DATABASE_URL at runtime
ENV DATABASE_URL=$DATABASE_URL

# Copy environment variables file if you have one
# COPY .env .env

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]