#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Skylevel Design Territories - Test Runner');
console.log('==========================================\n');

// Ensure test directories exist
const testDirs = ['test-results/screenshots', 'test-results/analysis', 'test-results/comparison'];
testDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log('Available test commands:');
console.log('1. Quick visual tests (screenshots only)');
console.log('2. Comprehensive analysis (full functionality)');
console.log('3. Content verification only');
console.log('4. All tests');
console.log('5. Exit\n');

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    const choice = chunk.trim();

    switch (choice) {
      case '1':
        console.log('\n📸 Running visual tests...');
        try {
          execSync('npx playwright test tests/visual-testing.spec.ts --project=chromium', { stdio: 'inherit', cwd: __dirname });
          console.log('\n✅ Visual tests completed! Check test-results/screenshots/');
        } catch (error) {
          console.log('\n❌ Visual tests failed');
        }
        break;

      case '2':
        console.log('\n🔍 Running comprehensive analysis...');
        try {
          execSync('npx playwright test tests/comprehensive-analysis.spec.ts --project=chromium', { stdio: 'inherit', cwd: __dirname });
          console.log('\n✅ Comprehensive analysis completed! Check COMPREHENSIVE_QA_REPORT.md');
        } catch (error) {
          console.log('\n❌ Analysis failed');
        }
        break;

      case '3':
        console.log('\n📝 Running content verification...');
        try {
          execSync('npx playwright test tests/content-verification.spec.ts --project=chromium', { stdio: 'inherit', cwd: __dirname });
          console.log('\n✅ Content verification completed!');
        } catch (error) {
          console.log('\n❌ Content verification failed');
        }
        break;

      case '4':
        console.log('\n🚀 Running all tests...');
        try {
          execSync('npx playwright test --project=chromium', { stdio: 'inherit', cwd: __dirname });
          console.log('\n✅ All tests completed! Check test-results/ and COMPREHENSIVE_QA_REPORT.md');
        } catch (error) {
          console.log('\n❌ Some tests failed - check report for details');
        }
        break;

      case '5':
        console.log('\n👋 Goodbye!');
        process.exit(0);

      default:
        console.log('\n❌ Invalid choice. Please enter 1-5.');
    }

    console.log('\nWhat would you like to do?');
  }
});

console.log('\nWhat would you like to do? (Enter 1-5)');