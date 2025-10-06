const { spawn } = require('child_process');

console.log('🚀 Testing Horizon Bridge E-commerce Integration\n');

// Test 1: Check if e-commerce app can start
console.log('Test 1: Starting e-commerce app...');
const ecommerceApp = spawn('npm', ['run', 'dev'], {
  cwd: 'ecommerce-app',
  shell: true,
  stdio: 'pipe'
});

let ecommerceOutput = '';

ecommerceApp.stdout.on('data', (data) => {
  const output = data.toString();
  ecommerceOutput += output;

  if (output.includes('Local:') || output.includes('ready')) {
    console.log('✅ E-commerce app started successfully');
    console.log('📝 Output:', output.match(/Local:\s*(http:\/\/[^\s]+)/)?.[1] || 'URL not found');

    // Test 2: Check if editor bridge script exists
    console.log('\nTest 2: Checking editor bridge script...');
    const fs = require('fs');
    const path = require('path');

    const bridgePath = path.join('ecommerce-app', 'public', 'editor-bridge.js');
    if (fs.existsSync(bridgePath)) {
      const stats = fs.statSync(bridgePath);
      console.log('✅ Editor bridge script exists');
      console.log(`📄 Size: ${(stats.size / 1024).toFixed(2)} KB`);

      // Test 3: Check if frontend can start
      console.log('\nTest 3: Starting frontend editor...');
      const frontendEditor = spawn('npm', ['run', 'dev'], {
        cwd: '🖥️.frontend',
        shell: true,
        stdio: 'pipe'
      });

      let frontendOutput = '';

      frontendEditor.stdout.on('data', (data) => {
        const output = data.toString();
        frontendOutput += output;

        if (output.includes('ready') || output.includes('started')) {
          console.log('✅ Frontend editor started successfully');
          console.log('📝 Output:', output.match(/http:\/\/[^\s]+/)?.[0] || 'URL not found');

          // Test 4: Check integration files
          console.log('\nTest 4: Checking integration files...');

          const integrationFiles = [
            '🖥️.frontend/src/components/Canvas/EcommerceAppLoader.tsx',
            '🖥️.frontend/src/components/Panels/CenterPanel.tsx',
            '🖥️.frontend/next.config.ts'
          ];

          integrationFiles.forEach(file => {
            if (fs.existsSync(file)) {
              console.log(`✅ ${file} exists`);
            } else {
              console.log(`❌ ${file} missing`);
            }
          });

          console.log('\n🎉 Integration test complete!');
          console.log('\nTo run the full application:');
          console.log('1. Open two terminals');
          console.log('2. Terminal 1: cd ecommerce-app && npm run dev');
          console.log('3. Terminal 2: cd "🖥️.frontend" && npm run dev');
          console.log('4. Open http://localhost:3000 in your browser');
          console.log('5. Click "E-commerce App" in the canvas toolbar');

          // Cleanup
          setTimeout(() => {
            ecommerceApp.kill();
            frontendEditor.kill();
            process.exit(0);
          }, 3000);
        }
      });

      frontendEditor.stderr.on('data', (data) => {
        console.error('Frontend error:', data.toString());
      });

    } else {
      console.log('❌ Editor bridge script missing');
      ecommerceApp.kill();
      process.exit(1);
    }
  }
});

ecommerceApp.stderr.on('data', (data) => {
  console.error('E-commerce app error:', data.toString());
});

ecommerceApp.on('close', (code) => {
  if (code !== 0) {
    console.log(`❌ E-commerce app exited with code ${code}`);
    process.exit(1);
  }
});

// Timeout after 30 seconds
setTimeout(() => {
  console.log('\n⏰ Test timed out');
  ecommerceApp.kill();
  process.exit(1);
}, 30000);