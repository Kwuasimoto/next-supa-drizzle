const { spawn } = require('child_process');
const readline = require('readline');

let currentProcess = null;

const startRemake = () => {
  if (currentProcess) {
    console.log('Stopping current process...');
    currentProcess.kill('SIGTERM');
    
    // Force kill after 5 seconds if it doesn't stop gracefully
    setTimeout(() => {
      if (currentProcess && !currentProcess.killed) {
        currentProcess.kill('SIGKILL');
      }
    }, 5000);
  }
  
  console.log('Starting remake process...');
  currentProcess = spawn('pnpm', ['remake'], { 
    stdio: 'inherit',
    shell: true 
  });
  
  currentProcess.on('close', (code) => {
    if (code !== null) {
      console.log(`\nRemake process exited with code ${code}`);
    }
    currentProcess = null;
  });
  
  currentProcess.on('error', (error) => {
    console.error('Error starting process:', error.message);
    currentProcess = null;
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=== Remake Watcher ===');
console.log('Commands:');
console.log('  r + Enter: Restart the remake process');
console.log('  s + Enter: Stop the current process');
console.log('  q + Enter: Quit');
console.log('========================\n');

startRemake();

rl.on('line', (input) => {
  const command = input.trim().toLowerCase();
  
  switch (command) {
    case 'r':
      console.log('\n🔄 Restarting remake process...');
      startRemake();
      break;
    case 's':
      if (currentProcess) {
        console.log('\n⏹️  Stopping current process...');
        currentProcess.kill('SIGTERM');
      } else {
        console.log('\n⚠️  No process is currently running');
      }
      break;
    case 'q':
      console.log('\n👋 Shutting down...');
      if (currentProcess) {
        currentProcess.kill('SIGTERM');
      }
      process.exit(0);
      break;
    default:
      console.log('\n❓ Unknown command. Use: r (restart), s (stop), q (quit)');
  }
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n🛑 Received SIGINT, shutting down...');
  if (currentProcess) {
    currentProcess.kill('SIGTERM');
  }
  process.exit(0);
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down...');
  if (currentProcess) {
    currentProcess.kill('SIGTERM');
  }
  process.exit(0);
});