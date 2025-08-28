# Development stage
FROM node:18-alpine as development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

EXPOSE 5173

# Development command with hot reload
CMD ["npm", "run", "dev"]

# Production build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine as production

# Copy built files from build stage
COPY --from=build /app/dist /var/www/html

# Copy nginx configuration would be handled by the main nginx container
# This stage serves the built files to the shared volume

# Create a simple command to copy files and exit
CMD ["cp", "-r", "/var/www/html/.", "/var/www/html/"]