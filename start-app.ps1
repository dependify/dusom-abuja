# DUSOM Abuja - Start Application
# This script starts both the backend API and frontend dev server

$ErrorActionPreference = "Stop"

Write-Host @"
╔══════════════════════════════════════════╗
║       DUSOM Abuja - Starting App         ║
╚══════════════════════════════════════════╝
"@ -ForegroundColor Cyan

# Function to check if a port is in use
function Test-PortInUse {
    param($Port)
    $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    return $connection -ne $null
}

# Kill any existing node processes on ports 3001 and 8080
Write-Host "Cleaning up existing processes..." -ForegroundColor Yellow
Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | 
    Select-Object -ExpandProperty OwningProcess | 
    Get-Unique | 
    ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }

Start-Sleep -Seconds 2

# Start Backend
Write-Host "`n🚀 Starting Backend API..." -ForegroundColor Green
Set-Location backend
$backendJob = Start-Job -ScriptBlock { 
    node dist/index.js 
}
Set-Location ..

Start-Sleep -Seconds 3

# Check if backend started
if (Test-PortInUse -Port 3001) {
    Write-Host "✅ Backend running on http://localhost:3001" -ForegroundColor Green
} else {
    Write-Host "❌ Backend failed to start" -ForegroundColor Red
    Receive-Job $backendJob
    exit 1
}

# Start Frontend
Write-Host "`n🚀 Starting Frontend..." -ForegroundColor Green
$frontendJob = Start-Job -ScriptBlock {
    npm run dev
}

Start-Sleep -Seconds 5

# Check if frontend started
if (Test-PortInUse -Port 8080) {
    Write-Host "✅ Frontend running on http://localhost:8080" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend failed to start" -ForegroundColor Red
    Receive-Job $frontendJob
    exit 1
}

Write-Host @"

╔══════════════════════════════════════════╗
║         ✅ App Started Successfully!      ║
╠══════════════════════════════════════════╣
║  Frontend: http://localhost:8080          ║
║  Backend:  http://localhost:3001          ║
║  API Docs: http://localhost:3001/health   ║
╚══════════════════════════════════════════╝

Press Ctrl+C to stop both servers
"@ -ForegroundColor Cyan

# Keep the script running and show logs
try {
    while ($true) {
        if ($backendJob.State -eq "Failed") {
            Write-Host "`n❌ Backend crashed!" -ForegroundColor Red
            Receive-Job $backendJob
            break
        }
        if ($frontendJob.State -eq "Failed") {
            Write-Host "`n❌ Frontend crashed!" -ForegroundColor Red
            Receive-Job $frontendJob
            break
        }
        Start-Sleep -Seconds 2
    }
} finally {
    Write-Host "`n🛑 Stopping servers..." -ForegroundColor Yellow
    Stop-Job $backendJob -ErrorAction SilentlyContinue
    Stop-Job $frontendJob -ErrorAction SilentlyContinue
    Remove-Job $backendJob -ErrorAction SilentlyContinue
    Remove-Job $frontendJob -ErrorAction SilentlyContinue
    Write-Host "✅ Servers stopped" -ForegroundColor Green
}
