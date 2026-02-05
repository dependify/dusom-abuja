# Database Migration Script for DUSOM (PowerShell)
# Usage: .\migrate-db.ps1 [action]
# Actions: create, migrate, reset, status, setup

param(
    [Parameter(Position=0)]
    [ValidateSet("create", "migrate", "reset", "status", "setup")]
    [string]$Action = "status"
)

# Configuration
$DB_HOST = "158.158.1.40"
$DB_PORT = "5432"
$DB_USER = "postgres"
$DB_PASS = "5kDSaWZSSqUDUIZ4x2iK16Ehg3YeGa6P6CiOUb5VtAwIkJqKXUbieKqcMQryoQhm"
$DB_NAME = "dusom"
$MIGRATION_FILE = "migrations/001_initial_schema.sql"

# Connection strings
$ADMIN_URL = "postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/postgres?sslmode=prefer"
$DB_URL = "postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=prefer"

# Helper functions
function Log-Info($message) {
    Write-Host "[INFO] $message" -ForegroundColor Green
}

function Log-Warn($message) {
    Write-Host "[WARN] $message" -ForegroundColor Yellow
}

function Log-Error($message) {
    Write-Host "[ERROR] $message" -ForegroundColor Red
}

function Test-Connection {
    Log-Info "Testing database connection..."
    try {
        $result = psql $ADMIN_URL -c "SELECT 1;" 2>&1
        if ($LASTEXITCODE -eq 0) {
            Log-Info "Database connection successful!"
            return $true
        }
    } catch {
        Log-Error "Cannot connect to database. Please check your credentials and network."
        return $false
    }
}

function Create-Database {
    Log-Info "Creating database '${DB_NAME}'..."
    
    $exists = psql $ADMIN_URL -t -c "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}';" 2>&1
    if ($exists -match "1") {
        Log-Warn "Database '${DB_NAME}' already exists."
        $confirm = Read-Host "Do you want to drop and recreate it? (y/N)"
        if ($confirm -match "^[yY]") {
            Log-Warn "Dropping database '${DB_NAME}'..."
            psql $ADMIN_URL -c "DROP DATABASE IF EXISTS ${DB_NAME};"
        } else {
            Log-Info "Skipping database creation."
            return
        }
    }
    
    psql $ADMIN_URL -c "CREATE DATABASE ${DB_NAME};"
    Log-Info "Database '${DB_NAME}' created successfully!"
}

function Run-Migration {
    Log-Info "Running migration script..."
    
    if (-not (Test-Path $MIGRATION_FILE)) {
        Log-Error "Migration file not found: $MIGRATION_FILE"
        exit 1
    }
    
    psql $DB_URL -f $MIGRATION_FILE
    Log-Info "Migration completed successfully!"
}

function Reset-Database {
    Log-Warn "This will DELETE ALL DATA in the database!"
    $confirm = Read-Host "Are you sure you want to continue? (yes/no)"
    
    if ($confirm -ne "yes") {
        Log-Info "Reset cancelled."
        return
    }
    
    Log-Info "Resetting database..."
    psql $ADMIN_URL -c "DROP DATABASE IF EXISTS ${DB_NAME};"
    Create-Database
    Run-Migration
    Log-Info "Database reset completed!"
}

function Show-Status {
    Log-Info "Database Status:"
    Write-Host "================"
    
    $exists = psql $ADMIN_URL -t -c "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}';" 2>&1
    if ($exists -match "1") {
        Log-Info "Database: EXISTS"
        
        $tableCount = (psql $DB_URL -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';").Trim()
        Log-Info "Tables: $tableCount"
        
        $userCount = (psql $DB_URL -t -c "SELECT COUNT(*) FROM public.users;").Trim()
        Log-Info "Users: $userCount"
        
        $appCount = (psql $DB_URL -t -c "SELECT COUNT(*) FROM public.admission_applications;").Trim()
        Log-Info "Applications: $appCount"
        
        $galleryCount = (psql $DB_URL -t -c "SELECT COUNT(*) FROM public.gallery_images;").Trim()
        Log-Info "Gallery Images: $galleryCount"
        
        $contactCount = (psql $DB_URL -t -c "SELECT COUNT(*) FROM public.contact_submissions;").Trim()
        Log-Info "Contact Submissions: $contactCount"
    } else {
        Log-Warn "Database: DOES NOT EXIST"
    }
}

# Main execution
try {
    switch ($Action) {
        "create" {
            if (Test-Connection) { Create-Database }
        }
        "migrate" {
            if (Test-Connection) { Run-Migration }
        }
        "reset" {
            if (Test-Connection) { Reset-Database }
        }
        "setup" {
            if (Test-Connection) {
                Create-Database
                Run-Migration
                Show-Status
            }
        }
        "status" {
            if (Test-Connection) { Show-Status }
        }
    }
} catch {
    Log-Error "An error occurred: $_"
    exit 1
}
