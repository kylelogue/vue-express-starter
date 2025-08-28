# Development stage
FROM node:18-alpine as development

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl openssl-dev

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm ci --include=dev

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3001

# Development command with hot reload
CMD ["npm", "run", "dev"]

# Production stage
FROM node:18-alpine as production

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl openssl-dev

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for build)
RUN npm ci

# Copy source code and prisma directory
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Remove dev dependencies after build
RUN npm prune --omit=dev

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
USER nodejs

EXPOSE 3001

# Production command
CMD ["npm", "start"]