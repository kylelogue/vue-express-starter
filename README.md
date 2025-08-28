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
- **Prisma Migrations** - Version-controlled database schema changes
- **Database Seeding** - Sample data for development

### Infrastructure (Docker)
- **Docker Compose** - Complete containerized development environment
- **Nginx Reverse Proxy** - Load balancing and static file serving
- **Hot Reload** - Live development with Vite HMR and nodemon
- **Mobile Testing** - Easy mobile device testing with local network access
- **Production Ready** - Optimized production builds and configurations

## 📋 Prerequisites

- **Node.js** 18.0.0 or higher
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

### For Production Deployment

1. **Clone on your server**
   ```bash
   git clone <your-repo-url> my-project
   cd my-project
   cp .env.example .env
   # Edit .env with production values
   ```

2. **Deploy**
   ```bash
   NODE_ENV=production npm run build
   npm run db:deploy
   NODE_ENV=production npm run dev
   ```

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

## 🚀 Production Deployment Details

### Environment Variables
Update your `.env` file with production values:
```bash
NODE_ENV=production
JWT_SECRET=your-secure-random-string-min-32-chars
DATABASE_URL=mysql://user:password@host:port/database
CORS_ORIGIN=https://your-domain.com
HTTP_PORT=80
HTTPS_PORT=443
```

### Deployment Commands
```bash
# Build optimized Docker images
NODE_ENV=production npm run build

# Apply database migrations (safe for production)
npm run db:deploy

# Start production services
NODE_ENV=production npm run dev
```

### How It Works
- **Frontend**: Vue app builds to static files served by Nginx
- **Backend**: TypeScript compiles to JavaScript, runs with Node.js
- **Database**: Migrations ensure schema is up-to-date
- **Nginx**: Handles SSL, static files, and API proxying

### Production Checklist
- [ ] Update JWT_SECRET to a secure random string
- [ ] Configure production DATABASE_URL
- [ ] Set up SSL certificates (Let's Encrypt recommended)
- [ ] Update CORS_ORIGIN to your domain
- [ ] Set up database backups
- [ ] Configure monitoring and logging
- [ ] Set up reverse proxy headers

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

## 🆘 Support

### Common Issues

**Container won't start**:
```bash
npm run logs:[service]  # Check specific service logs
npm run clean          # Clean and rebuild everything
```

**Database connection issues**:
```bash
npm run db:reset       # Reset database completely
npm run health         # Check system health
```

**Port conflicts**:
- Check if ports 80, 5173, 3306 are available
- Modify ports in `.env` if needed

### Getting Help
- Check the logs: `npm run logs`
- Inspect container status: `docker compose ps`
- Access container shells: `npm run shell:backend` or `npm run shell:frontend`

---

Built with ❤️ for modern full-stack development