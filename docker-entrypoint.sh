#!/bin/bash
set -e

# ============================================================================
# 1. Initialize and Start MariaDB
# ============================================================================
echo "[1/5] Starting MariaDB..."

# Initialize MariaDB data directory if not exists
if [ ! -d "/var/lib/mysql/mysql" ]; then
    echo "Initializing MariaDB data directory..."
    mariadb-install-db --user=mysql --datadir=/var/lib/mysql >/dev/null 2>&1
    echo "✓ MariaDB initialized successfully"
fi

# Start MariaDB in the background
# TCP binding configured in /etc/my.cnf.d/mariadb-server.cnf
mariadbd-safe --datadir=/var/lib/mysql --user=mysql >/dev/null 2>&1 &
MARIADB_PID=$!

echo "Waiting for MariaDB to be ready..."
for i in {1..30}; do
    if mariadb-admin ping -h localhost --silent 2>/dev/null; then
        echo "MariaDB is ready!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "ERROR: MariaDB failed to start within 30 seconds"
        exit 1
    fi
    sleep 1
done

# ============================================================================
# 2. Configure Database
# ============================================================================
echo "[2/5] Configuring database..."

# Create database and users if they don't exist
# Run mariadb as the mysql system user to bypass authentication
su -s /bin/sh mysql -c "mariadb <<-EOSQL
    CREATE DATABASE IF NOT EXISTS ${DB_NAME};

    -- Create user if it doesn't exist
    CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
    CREATE USER IF NOT EXISTS '${DB_USER}'@'%' IDENTIFIED BY '${DB_PASSWORD}';

    -- Grant privileges
    GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';
    GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'%';
    GRANT CREATE ON *.* TO '${DB_USER}'@'%';
    GRANT DROP ON *.* TO '${DB_USER}'@'%';

    FLUSH PRIVILEGES;
EOSQL
"

echo "Database configured successfully!"

# ============================================================================
# 3. Run Database Migrations
# ============================================================================
echo "[3/5] Running database migrations..."

cd /app/backend

# Always override DATABASE_URL to point to localhost (in-container database)
# App Platform may set this, but we need it to point to our local MariaDB
export DATABASE_URL="mysql://${DB_USER}:${DB_PASSWORD}@localhost:3306/${DB_NAME}"

# Verify database connection before running migrations
if ! MYSQL_PWD="${DB_PASSWORD}" mariadb -u "${DB_USER}" -h 127.0.0.1 --protocol=TCP "${DB_NAME}" -e "SELECT 1;" >/dev/null 2>&1; then
    echo "ERROR: Cannot connect to database"
    exit 1
fi
echo "Database connection successful!"

# Run Prisma migrations
echo "Applying database migrations..."
if npx prisma migrate deploy; then
    echo "✓ Database migrations applied successfully"
else
    echo "✗ Database migrations failed"
    exit 1
fi

# Seed database if requested
if [ "$SEED_DATABASE" = "true" ]; then
    echo "Seeding database..."
    npx prisma db seed
else
    echo "Skipping database seed (SEED_DATABASE not set to true)"
fi

# ============================================================================
# 4. Start Backend API
# ============================================================================
echo "[4/5] Starting backend API..."

cd /app/backend
node dist/server.js &
BACKEND_PID=$!

# Wait for backend to be ready
echo "Waiting for backend to be ready..."
for i in {1..30}; do
    if curl -f http://localhost:${SERVER_PORT}/health > /dev/null 2>&1; then
        echo "Backend is ready!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "ERROR: Backend failed to start"
        exit 1
    fi
    sleep 1
done

# ============================================================================
# 5. Start Nginx
# ============================================================================
echo "[5/5] Starting nginx..."

# Test nginx configuration
if nginx -t >/dev/null 2>&1; then
    echo "✓ Nginx configuration is valid"
else
    echo "✗ Nginx configuration test failed"
    nginx -t
    exit 1
fi

echo "✓ All services started successfully!"

# Function to handle shutdown gracefully
shutdown() {
    echo "Shutting down services..."

    # Stop nginx
    nginx -s quit 2>/dev/null || true

    # Stop backend
    kill $BACKEND_PID 2>/dev/null || true

    # Stop MariaDB
    mariadb-admin shutdown 2>/dev/null || true

    echo "Shutdown complete"
    exit 0
}

# Trap SIGTERM and SIGINT for graceful shutdown
trap shutdown SIGTERM SIGINT

# Start nginx in foreground
exec nginx -g "daemon off;"
