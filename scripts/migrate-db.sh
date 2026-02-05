#!/bin/bash
# Database Migration Script for DUSOM
# Usage: ./migrate-db.sh [action]
# Actions: create, migrate, reset, status

set -e

# Configuration
DB_HOST="158.158.1.40"
DB_PORT="5432"
DB_USER="postgres"
DB_PASS="5kDSaWZSSqUDUIZ4x2iK16Ehg3YeGa6P6CiOUb5VtAwIkJqKXUbieKqcMQryoQhm"
DB_NAME="dusom"
MIGRATION_FILE="migrations/001_initial_schema.sql"

# Connection strings
ADMIN_URL="postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/postgres?sslmode=prefer"
DB_URL="postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=prefer"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if psql is installed
check_psql() {
    if ! command -v psql &> /dev/null; then
        log_error "psql is not installed. Please install PostgreSQL client."
        exit 1
    fi
}

# Test database connection
test_connection() {
    log_info "Testing database connection..."
    if psql "${ADMIN_URL}" -c "SELECT 1;" > /dev/null 2>&1; then
        log_info "Database connection successful!"
        return 0
    else
        log_error "Cannot connect to database. Please check your credentials and network."
        return 1
    fi
}

# Create database
create_database() {
    log_info "Creating database '${DB_NAME}'..."
    
    if psql "${ADMIN_URL}" -c "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}';" | grep -q 1; then
        log_warn "Database '${DB_NAME}' already exists."
        read -p "Do you want to drop and recreate it? (y/N): " confirm
        if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
            log_warn "Dropping database '${DB_NAME}'..."
            psql "${ADMIN_URL}" -c "DROP DATABASE IF EXISTS ${DB_NAME};"
        else
            log_info "Skipping database creation."
            return 0
        fi
    fi
    
    psql "${ADMIN_URL}" -c "CREATE DATABASE ${DB_NAME};"
    log_info "Database '${DB_NAME}' created successfully!"
}

# Run migrations
run_migration() {
    log_info "Running migration script..."
    
    if [ ! -f "${MIGRATION_FILE}" ]; then
        log_error "Migration file not found: ${MIGRATION_FILE}"
        exit 1
    fi
    
    psql "${DB_URL}" -f "${MIGRATION_FILE}"
    log_info "Migration completed successfully!"
}

# Reset database
reset_database() {
    log_warn "This will DELETE ALL DATA in the database!"
    read -p "Are you sure you want to continue? (yes/no): " confirm
    
    if [ "$confirm" != "yes" ]; then
        log_info "Reset cancelled."
        exit 0
    fi
    
    log_info "Resetting database..."
    psql "${ADMIN_URL}" -c "DROP DATABASE IF EXISTS ${DB_NAME};"
    create_database
    run_migration
    log_info "Database reset completed!"
}

# Check database status
show_status() {
    log_info "Database Status:"
    echo "================"
    
    # Check if database exists
    if psql "${ADMIN_URL}" -c "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}';" | grep -q 1; then
        log_info "Database: EXISTS"
        
        # Count tables
        local table_count=$(psql "${DB_URL}" -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" | xargs)
        log_info "Tables: ${table_count}"
        
        # Count users
        local user_count=$(psql "${DB_URL}" -t -c "SELECT COUNT(*) FROM public.users;" | xargs)
        log_info "Users: ${user_count}"
        
        # Count applications
        local app_count=$(psql "${DB_URL}" -t -c "SELECT COUNT(*) FROM public.admission_applications;" | xargs)
        log_info "Applications: ${app_count}"
        
        # Count gallery images
        local gallery_count=$(psql "${DB_URL}" -t -c "SELECT COUNT(*) FROM public.gallery_images;" | xargs)
        log_info "Gallery Images: ${gallery_count}"
        
        # Count contact submissions
        local contact_count=$(psql "${DB_URL}" -t -c "SELECT COUNT(*) FROM public.contact_submissions;" | xargs)
        log_info "Contact Submissions: ${contact_count}"
    else
        log_warn "Database: DOES NOT EXIST"
    fi
}

# Main command handler
main() {
    check_psql
    
    case "${1:-status}" in
        create)
            test_connection && create_database
            ;;
        migrate)
            test_connection && run_migration
            ;;
        reset)
            test_connection && reset_database
            ;;
        setup)
            test_connection && create_database && run_migration && show_status
            ;;
        status)
            test_connection && show_status
            ;;
        *)
            echo "Usage: $0 [action]"
            echo ""
            echo "Actions:"
            echo "  create   - Create the database"
            echo "  migrate  - Run the migration script"
            echo "  reset    - Drop and recreate the database"
            echo "  setup    - Full setup (create + migrate + status)"
            echo "  status   - Show database status (default)"
            echo ""
            exit 1
            ;;
    esac
}

main "$@"
