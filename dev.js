const { spawn } = require('child_process');
const { exec } = require('child_process');

// Function to run command in a directory
function runCommand(command, cwd, name) {
  return new Promise((resolve, reject) => {
    console.log(`Starting ${name}...`);

    const child = spawn(command, {
      cwd: cwd,
      shell: true,
      stdio: 'inherit'
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${name} exited with code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

// Function to run command in background
function runInBackground(command, cwd, name) {
  console.log(`Starting ${name} in background...`);

  const child = spawn(command, {
    cwd: cwd,
    shell: true,
    detached: true,
    stdio: 'inherit'
  });

  child.unref();

  return child;
}

async function main() {
  try {
    // Start the e-commerce app first (port 5173)
    const ecommerceApp = runInBackground('npm run dev', 'ecommerce-app', 'E-commerce App');

    // Wait a bit for the e-commerce app to start
    console.log('Waiting for e-commerce app to start...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Start the frontend editor (port 3000)
    console.log('Starting frontend editor...');
    const frontendEditor = spawn('npm run dev', {
      cwd: '🖥️.frontend',
      shell: true,
      stdio: 'inherit'
    });

    // Handle process termination
    process.on('SIGINT', () => {
      console.log('\nStopping all processes...');
      process.kill(-ecommerceApp.pid);
      process.kill(-frontendEditor.pid);
      process.exit();
    });

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();