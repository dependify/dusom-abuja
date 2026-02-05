const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Log file
const logFile = path.join(__dirname, 'server.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

console.log(`[${new Date().toISOString()}] Starting DUSOM backend server...`);
logStream.write(`[${new Date().toISOString()}] Starting DUSOM backend server...\n`);

const server = spawn('node', ['dist/index.js'], {
  cwd: __dirname,
  stdio: ['ignore', 'pipe', 'pipe']
});

server.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(output.trim());
  logStream.write(output);
});

server.stderr.on('data', (data) => {
  const output = data.toString();
  console.error(output.trim());
  logStream.write(output);
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
  logStream.write(`[${new Date().toISOString()}] Server exited with code ${code}\n`);
  logStream.end();
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill('SIGINT');
  process.exit(0);
});

console.log(`Server started with PID: ${server.pid}`);
