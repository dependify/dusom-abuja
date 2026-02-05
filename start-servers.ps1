# Start DUSOM Servers
$backend = Start-Process -FilePath "node" -ArgumentList "dist/index.js" -WorkingDirectory "c:\Users\USER\dusom-abuja\backend" -PassThru -NoNewWindow
Write-Host "Backend started (PID: $($backend.Id))" -ForegroundColor Green

Start-Sleep -Seconds 3

$frontend = Start-Process -FilePath "node" -ArgumentList "./node_modules/vite/bin/vite.js" -WorkingDirectory "c:\Users\USER\dusom-abuja" -PassThru -NoNewWindow
Write-Host "Frontend started (PID: $($frontend.Id))" -ForegroundColor Green

Write-Host "`nServers running:" -ForegroundColor Cyan
Write-Host "  Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "`nPress Ctrl+C to stop" -ForegroundColor Yellow

Wait-Process -Id $backend.Id
