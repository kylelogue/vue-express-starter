# Vue Express Starter

A modern full-stack starter template featuring Vue 3 with TypeScript, Express.js with TypeScript, Prisma ORM, MariaDB, and Docker. Built for rapid development with authentication, responsive design, and production-ready deployment.

## 🎯 Development vs Production

This starter provides the best of both worlds:

| Mode | Live Updates | Optimized Build | Use Case |
|------|-------------|----------------|----------|
| **Development** | ✅ Hot reload on file save | ❌ | Local development with instant feedback |
| **Production** | ❌ | ✅ Minified, compiled, secure | Server deployment with optimal performance |

**Development**: Code changes reflect immediately in your browser - no rebuilds needed.  
**Production**: Optimized Docker images with compiled assets, perfect for cloning to a server.

## 🚀 Features

### Frontend (Vue 3 + TypeScript)
- **Vue 3 + Composition API** - Modern reactive framework with `<script setup lang="ts">` syntax
- **TypeScript** - Full type safety with interfaces and strict typing
- **Vue Router 4** - Client-side routing with navigation guards and typed routes
- **Pinia** - Typed state management store
- **SCSS** - CSS preprocessing with organized variables and utilities
- **Mobile-First Responsive Design** - min-width breakpoints for progressive enhancement
- **Component Library** - Fully typed reusable UI components (BaseButton, BaseInput, BaseCard)

### Backend (Express.js + TypeScript)
- **Express.js** - Fast, minimal web framework with ES modules and TypeScript
- **TypeScript** - Comprehensive typing for all endpoints, middleware, and services
- **Prisma ORM** - Type-safe database operations with generated TypeScript client
- **JWT Authentication** - Access tokens + refresh tokens with httpOnly cookies
- **Input Validation** - Express-validator for request validation with TypeScript interfaces
- **CORS Configuration** - Environment-aware cross-origin setup
- **Health Check** - Built-in health monitoring endpoint

### Database (MariaDB)
- **MariaDB 11** - High-performance MySQL-compatible database
- **Prisma 6.0** - Latest version with improved type safety and performance
- **Prisma Migrations** - Version-controlled database schema changes
- **Database Seeding** - Sample data for development with TypeScript

### Infrastructure (Docker)
- **Docker Compose** - Complete containerized development environment
- **Nginx Reverse Proxy** - Load balancing and static file serving
- **Hot Reload** - Live development with Vite HMR and nodemon
- **Mobile Testing** - Easy mobile device testing with local network access
- **Production Ready** - Optimized production builds and configurations

## 📋 Prerequisites

- **Node.js** 20.19.0 or higher
- **Docker** 20.0.0 or higher
- **Docker Compose** 2.0.0 or higher

## 🏃‍♂️ Quick Start

### For Local Development (Live Updates)

1. **Clone and setup**
   ```bash
   git clone <your-repo-url> my-project
   cd my-project
   cp .env.example .env
   ```

2. **Start development environment**
   ```bash
   npm run dev              # Starts with hot reload
   npm run db:migrate       # Setup database
   npm run db:seed          # Add sample data
   ```

3. **Start coding!**
   - Edit files in `frontend/src/` or `backend/src/`
   - Changes appear instantly in your browser
   - Frontend: http://localhost
   - API: http://localhost/health

### For Production Deployment (Digital Ocean App Platform)

This template includes a production-ready deployment configuration for Digital Ocean App Platform:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Create App on Digital Ocean**
   - Go to App Platform in Digital Ocean console
   - Select your GitHub repository
   - App Platform will automatically detect the configuration

3. **Set Environment Variables** (in DO Console > Settings > Environment Variables):
   - Set all variables at **APP LEVEL** (not service level)
   - Required variables: `DB_NAME`, `DB_USER`, `DB_URL`, `VITE_API_URL`, `SERVER_PORT`, `CORS_ORIGIN`, `JWT_SECRET`, `SEED_DATABASE`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
   - See [.do/app.yaml](.do/app.yaml) for full list and details

4. **Deploy**
   - App Platform automatically builds and deploys on push to main branch
   - Cost: Starting at $5/month for basic-xxs instance

See the [Deployment](#-deployment-guide) section for detailed instructions.

## 🛠️ Development Workflow

### Essential Commands

```bash
# Development
npm run dev              # Start all services in background
npm run dev:logs         # Start all services with logs
npm run stop             # Stop all services
npm run restart          # Restart all services

# Database Operations
npm run db:migrate       # Apply database migrations
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Prisma Studio
npm run db:reset         # Reset database (⚠️ deletes all data)

# Monitoring
npm run logs             # View logs from all services
npm run logs:backend     # View backend logs only
npm run logs:frontend    # View frontend logs only
npm run health           # Check application health

# Development Tools
npm run lint             # Lint both frontend and backend
npm run shell:backend    # Access backend container shell
npm run shell:frontend   # Access frontend container shell
npm run ip               # Get local IP for mobile testing

# TypeScript
docker compose exec backend npm run build    # Compile backend TypeScript
docker compose exec frontend npm run type-check  # Check frontend types
docker compose exec frontend npm run build   # Build frontend with type checking
```

### Installing Dependencies

Always install dependencies inside containers:

```bash
# Backend dependencies
npm run shell:backend
npm install <package-name>

# Frontend dependencies
npm run shell:frontend  
npm install <package-name>

# Or directly:
docker compose exec backend npm install <package-name>
docker compose exec frontend npm install <package-name>
```

### Mobile Development

Test on mobile devices effortlessly:

1. Get your local IP: `npm run ip`
2. Access from mobile: `http://[YOUR_IP]` (e.g., http://192.168.1.50)
3. Hot reload works automatically

## 📱 Default User Accounts

After running `npm run db:seed`:

- **Admin User**: admin@example.com / admin123
- **Regular User**: user@example.com / user123

## 🏗️ Project Structure

```
vue-express-starter/
├── backend/              # Express.js + TypeScript API server
│   ├── src/
│   │   ├── modules/      # Feature modules (auth, users, health) - all .ts files
│   │   ├── middleware/   # Express middleware with TypeScript
│   │   ├── config/       # Configuration files (.ts)
│   │   └── utils/        # Utility functions (.ts)
│   ├── prisma/           # Database schema and migrations
│   ├── tsconfig.json     # TypeScript configuration
│   └── package.json
├── frontend/             # Vue 3 + TypeScript application
│   ├── src/
│   │   ├── components/   # Vue components with <script setup lang="ts">
│   │   ├── views/        # Page components (.vue with TypeScript)
│   │   ├── services/     # API services (.ts with typed interfaces)
│   │   ├── stores/       # Pinia stores (.ts with typed state)
│   │   └── router/       # Vue Router configuration (.ts)
│   ├── tsconfig.json     # TypeScript configuration
│   ├── env.d.ts          # TypeScript environment declarations
│   └── package.json
├── nginx/                # Reverse proxy configuration
├── database/             # Database initialization
├── docker-compose.yml    # Container orchestration
└── package.json          # Root scripts and metadata
```

## 🔷 TypeScript Implementation

### Full Stack Type Safety
This template provides comprehensive TypeScript support across the entire stack:

#### Backend TypeScript Features
- **Express.js with TypeScript** - All routes, controllers, and middleware fully typed
- **Prisma Generated Types** - Database models automatically generate TypeScript types
- **Interface-Driven Architecture** - All data structures defined with TypeScript interfaces
- **Typed API Responses** - Consistent typing for all API endpoints
- **ESM + TypeScript** - Modern ES modules with TypeScript compilation

#### Frontend TypeScript Features
- **Vue 3 + TypeScript** - All components use `<script setup lang="ts">`
- **Typed Component Props** - Interfaces for all component properties
- **Pinia with TypeScript** - Fully typed stores with state, getters, and actions
- **Vue Router Types** - Route meta properties and navigation guards typed
- **API Client Types** - All HTTP requests and responses typed

#### Development Benefits
- **Compile-Time Error Detection** - Catch errors before runtime
- **IntelliSense Support** - Rich IDE autocompletion and refactoring
- **Type-Safe Refactoring** - Rename and restructure code with confidence
- **Documentation via Types** - Types serve as inline documentation

#### Type Checking Commands
```bash
# Check all TypeScript in both frontend and backend
docker compose exec backend npm run build
docker compose exec frontend npm run type-check

# Watch mode for development
docker compose exec backend npm run dev  # Uses ts-node with watch
docker compose exec frontend npm run dev  # Vite handles TypeScript
```

## 🔐 Authentication System

### JWT Token Flow
1. **Login/Register** → Receive access token + refresh token (httpOnly cookie)
2. **API Requests** → Include access token in Authorization header
3. **Token Expiry** → Automatically refresh using refresh token
4. **Logout** → Clear tokens from both client and server

### Protected Routes
- Frontend routes use `meta: { requiresAuth: true }`
- Backend routes use `authorize` middleware
- Automatic redirects for unauthenticated users

## 🎨 Frontend Architecture

### Component Naming
- **Base Components**: `BaseButton`, `BaseInput`, `BaseCard` (reusable UI)
- **Feature Components**: Organized by feature (auth, layout, etc.)
- **Views**: Page-level components

### State Management
- **Pinia Stores**: Fully typed stores for auth and global state
- **Composition API**: Local state in components with TypeScript support
- **Services**: API calls abstracted into service layers with typed responses
- **Interface-Driven**: All data structures defined with TypeScript interfaces

### Styling
- **SCSS Variables**: Consistent colors, spacing, typography
- **Mobile-First Design**: Progressive enhancement with min-width breakpoints
- **Responsive Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- **Component Block Ordering**: script-template-style structure for consistency

## 🔧 Backend Architecture

### Module Structure
Each feature module contains:
- `*.service.ts` - Business logic with TypeScript interfaces
- `*.controller.ts` - Request/response handling with typed Express handlers
- `*.routes.ts` - Route definitions with typed middleware
- `*.validators.ts` - Input validation with TypeScript support

### Database Operations
- All database queries use Prisma ORM
- Type-safe operations with generated client
- Migration-based schema management

## 🐳 Docker Configuration

### Development Mode
- **Source Code Mounting**: Live file sync between host and containers
- **Hot Reload**: Vite HMR for frontend, nodemon for backend
- **Debug Friendly**: Easy access to logs and container shells

### Production Mode
- **Optimized Builds**: Minified assets and production configurations
- **Security**: Non-root users and minimal attack surface
- **Performance**: Nginx static file serving and gzip compression

## 📊 Monitoring & Health Checks

### Health Check Endpoint
`GET /health` returns:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "environment": "development",
  "services": {
    "database": "healthy",
    "api": "healthy"
  }
}
```

### Logging
- **Development**: Detailed logs with Prisma query logging
- **Production**: Error and warning logs only
- **Docker Logs**: `npm run logs` for aggregated service logs

## 🚀 Deployment Guide

### Digital Ocean App Platform (Recommended - $5-12/month)

The easiest way to deploy this starter template is using Digital Ocean App Platform. This method combines backend, frontend, and database in a single cost-effective container.

#### Prerequisites
- Digital Ocean account
- GitHub repository with your code
- Domain name (optional)

#### Step-by-Step Deployment

1. **Prepare Your Repository**
   ```bash
   # Update .do/app.yaml with your repository details
   # Change: github.repo: "YOUR_GITHUB_USERNAME/YOUR_REPO_NAME"

   git add .
   git commit -m "Configure for App Platform deployment"
   git push origin main
   ```

2. **Create App on Digital Ocean**
   - Log into [Digital Ocean Console](https://cloud.digitalocean.com/apps)
   - Click "Create App"
   - Select "GitHub" as source
   - Choose your repository and branch (main)
   - App Platform will detect `.do/app.yaml` automatically
   - Click "Next" through the review screens

3. **Configure Environment Variables (CRITICAL - Read Carefully)**

   ⚠️ **IMPORTANT: .env files are NOT used on App Platform - ALL variables must be set in DO Console UI**

   ⚠️ **Based on production deployment experience, follow these steps EXACTLY:**

   **Step 1: Navigate to APP-Level Environment Variables**
   - Go to: Settings > Environment Variables (the main section, NOT service-specific)
   - This is at the top of the Settings page
   - **Do NOT add variables under any service-specific sections**

   **Step 2: Add ALL Required Variables in DO Console UI**

   Copy these exact variable names and values:

   ```
   CORS_ORIGIN = https://yourapp.ondigitalocean.app
   VITE_API_URL = /api
   DB_NAME = starter
   DB_USER = starter_user
   DB_PASSWORD = ********** [CHECK "Encrypt"]
   DB_ROOT_PASSWORD = ********** [CHECK "Encrypt"]
   SERVER_PORT = 3001
   JWT_SECRET = ********** [CHECK "Encrypt", 32+ chars]
   ADMIN_EMAIL = ********** [CHECK "Encrypt"]
   ADMIN_PASSWORD = ********** [CHECK "Encrypt"]
   SEED_DATABASE = true
   ```

   **Step 3: Mark Sensitive Variables as Encrypted**

   Check the "Encrypt" checkbox for these variables:
   - `DB_PASSWORD`
   - `DB_ROOT_PASSWORD`
   - `JWT_SECRET`
   - `ADMIN_EMAIL` ⚠️ **MUST be encrypted**
   - `ADMIN_PASSWORD` ⚠️ **MUST be encrypted**

   **Step 4: Remove Service-Level Variables (CRITICAL)**
   - Click on your "web" service in the left sidebar
   - Go to Settings tab
   - Scroll to Environment Variables section
   - **DELETE any variables** found there (even if empty)
   - Known Issue: Service-level vars override app-level vars

   **Step 5: Variables NOT to Set**
   - ❌ Do NOT set `DATABASE_URL` - it's auto-constructed in docker-entrypoint.sh
   - ❌ Do NOT set `NODE_ENV` - it's set in Dockerfile
   - ❌ Do NOT upload or use .env files (they don't work on App Platform)

4. **Deploy**
   - Click "Create Resources"
   - Wait for build and deployment (5-10 minutes)
   - Access your app at the provided URL

5. **Test Deployment**
   ```bash
   # Check health
   curl https://yourapp.ondigitalocean.app/api/health

   # Login with your ADMIN_EMAIL and ADMIN_PASSWORD
   ```

#### ⚠️ Important: Ephemeral Storage Warning

**Digital Ocean App Platform uses ephemeral storage:**
- Database data is **LOST on every deployment**
- All data is **recreated from migrations + seed** on startup
- Keep `SEED_DATABASE=true` to recreate admin user on every deploy

**For production with persistent data:**
1. Add Digital Ocean Managed Database (~$15/month additional)
2. Update `DATABASE_URL` to point to managed database
3. Set `SEED_DATABASE=false` after initial deployment

#### Cost Optimization

| Instance Size | RAM | vCPU | Cost/Month | Use Case |
|--------------|-----|------|------------|----------|
| basic-xxs | 512 MB | 1 | $5 | Development/Testing |
| basic-xs | 1 GB | 1 | $12 | Production (Recommended) |

#### Automatic Deployments

App Platform automatically redeploys when you push to main:
```bash
git add .
git commit -m "Update feature"
git push origin main  # Triggers automatic deployment
```

---

### Environment Variables Reference

See [.env.example](.env.example) for all available environment variables with descriptions.

**Critical Security Variables:**
- `JWT_SECRET` - Minimum 32 characters, use a cryptographically secure random string
- `DB_PASSWORD` - Use strong passwords for production
- `ADMIN_PASSWORD` - Secure password for admin account

**Generate Secure Secrets:**
```bash
# Generate JWT_SECRET (Linux/macOS)
openssl rand -base64 32

# Generate passwords
openssl rand -base64 24
```

---

### Production Checklist

- [ ] Update `.do/app.yaml` with your GitHub repository
- [ ] Set all environment variables in DO Console (APP LEVEL)
- [ ] Use encrypted storage for secrets (JWT_SECRET, passwords)
- [ ] Update CORS_ORIGIN to your production domain
- [ ] Consider managed database for persistent data
- [ ] Set up custom domain (optional)
- [ ] Configure auto-scaling if needed (optional)

## 🧪 Testing

### Manual Testing
- **API**: Use Prisma Studio or API client (Postman/Insomnia)
- **Frontend**: Browser-based testing with multiple user accounts
- **Integration**: End-to-end user flows

### Adding Automated Tests
The template includes testing frameworks:
- **Backend**: Jest setup ready for unit/integration tests
- **Frontend**: Vitest configured for component testing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


### Getting Help
- Check the logs: `npm run logs`
- Inspect container status: `docker compose ps`
- Access container shells: `npm run shell:backend` or `npm run shell:frontend`
- App Platform logs: Digital Ocean Console > Apps > Your App > Runtime Logs

---

Built with ❤️ for modern full-stack development