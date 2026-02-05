# DUSOM Application Startup Script
# Starts both backend and frontend services

$backendEnv = @{
    DATABASE_URL = "postgres://postgres:5kDSaWZSSqUDUIZ4x2iK16Ehg3YeGa6P6CiOUb5VtAwIkJqKXUbieKqcMQryoQhm@158.158.1.40:5432/dusom?sslmode=disable"
    JWT_SECRET = "dusom-super-secret-key-for-jwt-signing-2024"
    PORT = "3001"
    CORS_ORIGINS = "http://localhost:8080,http://127.0.0.1:8080,http://localhost:5173"
    UPLOAD_DIR = "./uploads"
    NODE_ENV = "development"
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting DUSOM Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "[1/2] Starting Backend API..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    param($envVars)
    Set-Location C:\Users\USER\dusom-abuja\backend
    
    # Set environment variables
    $env:DATABASE_URL = $envVars.DATABASE_URL
    $env:JWT_SECRET = $envVars.JWT_SECRET
    $env:PORT = $envVars.PORT
    $env:CORS_ORIGINS = $envVars.CORS_ORIGINS
    $env:UPLOAD_DIR = $envVars.UPLOAD_DIR
    $env:NODE_ENV = $envVars.NODE_ENV
    
    & node dist/index.js
} -ArgumentList $backendEnv

# Wait for backend to start
Start-Sleep -Seconds 3
$backendTest = Invoke-WebRequest -Uri "http://localhost:3001/health" -UseBasicParsing -TimeoutSec 5 -ErrorAction SilentlyContinue
if ($backendTest.StatusCode -eq 200) {
    Write-Host "      ✓ Backend running on http://localhost:3001" -ForegroundColor Green
} else {
    Write-Host "      ✗ Backend failed to start" -ForegroundColor Red
    Receive-Job $backendJob
}

# Start Frontend
Write-Host "[2/2] Starting Frontend..." -ForegroundColor Yellow
$frontendJob = Start-Job -ScriptBlock {
    Set-Location C:\Users\USER\dusom-abuja
    & npm run dev
}

# Wait for frontend to start
Start-Sleep -Seconds 5
$frontendTest = Invoke-WebRequest -Uri "http://localhost:8080" -UseBasicParsing -TimeoutSec 5 -ErrorAction SilentlyContinue
if ($frontendTest.StatusCode -eq 200) {
    Write-Host "      ✓ Frontend running on http://localhost:8080" -ForegroundColor Green
} else {
    Write-Host "      ✗ Frontend failed to start" -ForegroundColor Red
    Receive-Job $frontendJob
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DUSOM Application Started!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Frontend: http://localhost:8080" -ForegroundColor White
Write-Host "  Backend:  http://localhost:3001" -ForegroundColor White
Write-Host "  Health:   http://localhost:3001/health" -ForegroundColor White
Write-Host ""
Write-Host "  Admin Login:" -ForegroundColor Yellow
Write-Host "    URL:      http://localhost:8080/admin/login" -ForegroundColor White
Write-Host "    Email:    admin@dusomabuja.org" -ForegroundColor White
Write-Host "    Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "  Press Ctrl+C to stop" -ForegroundColor Magenta
Write-Host ""

# Keep the script running and show logs
try {
    while ($true) {
        $backendOutput = Receive-Job $backendJob -ErrorAction SilentlyContinue
        $frontendOutput = Receive-Job $frontendJob -ErrorAction SilentlyContinue
        
        if ($backendOutput) {
            Write-Host "[BACKEND] $backendOutput" -ForegroundColor Blue
        }
        if ($frontendOutput) {
            Write-Host "[FRONTEND] $frontendOutput" -ForegroundColor Green
        }
        
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host "`nStopping services..." -ForegroundColor Yellow
    Stop-Job $backendJob -ErrorAction SilentlyContinue
    Stop-Job $frontendJob -ErrorAction SilentlyContinue
    Remove-Job $backendJob -ErrorAction SilentlyContinue
    Remove-Job $frontendJob -ErrorAction SilentlyContinue
    taskkill /F /IM node.exe 2>$null
    Write-Host "Services stopped." -ForegroundColor Green
}
