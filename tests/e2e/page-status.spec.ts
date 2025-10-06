import { test, expect } from '@playwright/test';

test.describe('Skylevel App - Page Status Tests', () => {
  const pages = [
    { name: 'Homepage', path: '/', expectedStatus: 200 },
    { name: 'Candidate Dashboard', path: '/candidate/dashboard', expectedStatus: 200 },
    { name: 'Candidate Profile', path: '/candidate/profile', expectedStatus: 200 },
    { name: 'Jobs Listing', path: '/jobs', expectedStatus: 200 },
    { name: 'Job Detail Page', path: '/jobs/1', expectedStatus: 200 },
    { name: 'Job Application Page', path: '/jobs/1/apply', expectedStatus: 200 },
    { name: 'Referral Page', path: '/referral/abc123', expectedStatus: 200 },
    { name: 'Fit Queue Page', path: '/fit-queue', expectedStatus: 200 }
  ];

  test.beforeEach(async ({ page }) => {
    // Set default timeout for navigation
    page.setDefaultTimeout(30000);
  });

  test('should test all pages and report their status', async ({ page }) => {
    const results = [];

    for (const pageInfo of pages) {
      console.log(`Testing ${pageInfo.name}: ${pageInfo.path}`);

      try {
        const response = await page.goto(pageInfo.path, {
          waitUntil: 'domcontentloaded',
          timeout: 30000
        });

        // Check if we got a response
        const status = response?.status() || 'No response';
        const success = response?.ok() || false;

        // Take screenshot for debugging
        await page.screenshot({
          path: `test-results/screenshots/${pageInfo.name.replace(/\s+/g, '-').toLowerCase()}.png`,
          fullPage: true
        });

        // Get page title for additional verification
        const title = await page.title();

        // Check for error indicators on the page
        const hasErrorContent = await page.locator('text=404').count() > 0 ||
                                await page.locator('text=500').count() > 0 ||
                                await page.locator('text=Application error').count() > 0 ||
                                await page.locator('text=Internal Server Error').count() > 0;

        results.push({
          name: pageInfo.name,
          path: pageInfo.path,
          status: status,
          success: success,
          title: title,
          hasErrorContent: hasErrorContent,
          expectedStatus: pageInfo.expectedStatus,
          finalStatus: hasErrorContent ? 'FAILED (Error content found)' : (success ? 'PASSED' : 'FAILED')
        });

        console.log(`  Status: ${status}, Success: ${success}, Title: ${title}, Error content: ${hasErrorContent}`);

      } catch (error) {
        console.error(`  Error accessing ${pageInfo.name}: ${error.message}`);

        // Take screenshot even on error
        try {
          await page.screenshot({
            path: `test-results/screenshots/${pageInfo.name.replace(/\s+/g, '-').toLowerCase()}-error.png`,
            fullPage: true
          });
        } catch (screenshotError) {
          console.error(`    Could not take screenshot: ${screenshotError.message}`);
        }

        results.push({
          name: pageInfo.name,
          path: pageInfo.path,
          status: 'ERROR',
          success: false,
          title: 'N/A',
          hasErrorContent: true,
          expectedStatus: pageInfo.expectedStatus,
          finalStatus: `FAILED (${error.message})`,
          error: error.message
        });
      }

      // Brief pause between requests to avoid overwhelming the server
      await page.waitForTimeout(1000);
    }

    // Print comprehensive results
    console.log('\n=== PAGE TEST RESULTS ===');
    console.log('Page'.padEnd(25) + 'Path'.padEnd(30) + 'Status'.padEnd(10) + 'Result'.padEnd(15) + 'Details');
    console.log('-'.repeat(100));

    let passedCount = 0;
    let failedCount = 0;

    results.forEach(result => {
      const status = typeof result.status === 'number' ? result.status.toString() : result.status;
      const details = result.title !== 'N/A' ? result.title.substring(0, 30) : (result.error || 'No response');

      console.log(
        result.name.padEnd(25) +
        result.path.padEnd(30) +
        status.padEnd(10) +
        result.finalStatus.padEnd(15) +
        details
      );

      if (result.finalStatus === 'PASSED') {
        passedCount++;
      } else {
        failedCount++;
      }
    });

    console.log('\n=== SUMMARY ===');
    console.log(`Total pages tested: ${results.length}`);
    console.log(`Passed: ${passedCount}`);
    console.log(`Failed: ${failedCount}`);
    console.log(`Success rate: ${((passedCount / results.length) * 100).toFixed(1)}%`);

    // List failed pages
    const failedPages = results.filter(r => r.finalStatus !== 'PASSED');
    if (failedPages.length > 0) {
      console.log('\n=== FAILED PAGES ===');
      failedPages.forEach(page => {
        console.log(`❌ ${page.name} (${page.path}): ${page.finalStatus}`);
      });
    }

    // List passed pages
    const passedPages = results.filter(r => r.finalStatus === 'PASSED');
    if (passedPages.length > 0) {
      console.log('\n=== WORKING PAGES ===');
      passedPages.forEach(page => {
        console.log(`✅ ${page.name} (${page.path}): Status ${page.status}, Title: "${page.title}"`);
      });
    }

    // Save results to JSON for further analysis
    await page.evaluate((resultsData) => {
      // Create download link for results
      const blob = new Blob([JSON.stringify(resultsData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'page-test-results.json';
      a.click();
      URL.revokeObjectURL(url);
    }, results);

    // Fail the test if any pages failed
    if (failedCount > 0) {
      throw new Error(`${failedCount} out of ${results.length} pages failed testing. See test results and screenshots for details.`);
    }
  });

  // Additional test for server availability
  test('should confirm server is running on port 3010', async ({ page }) => {
    try {
      const response = await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 10000 });
      expect(response?.ok()).toBeTruthy();
      console.log('✅ Server is running and accessible on port 3010');
    } catch (error) {
      console.error('❌ Server is not accessible:', error.message);
      throw error;
    }
  });

  // Test for common elements that should be present on working pages
  test('should check for common layout elements on pages that load successfully', async ({ page }) => {
    const commonPages = ['/', '/jobs', '/fit-queue'];

    for (const path of commonPages) {
      console.log(`Checking common elements on ${path}`);

      try {
        await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 15000 });

        // Check for basic HTML structure
        const hasHtml = await page.locator('html').count() > 0;
        const hasBody = await page.locator('body').count() > 0;
        const hasHead = await page.locator('head').count() > 0;

        // Check for common layout elements that might be present
        const hasNav = await page.locator('nav').count() > 0;
        const hasMain = await page.locator('main').count() > 0;
        const hasHeader = await page.locator('header').count() > 0;

        console.log(`  ${path}: HTML=${hasHtml}, Body=${hasBody}, Head=${hasHead}, Nav=${hasNav}, Main=${hasMain}, Header=${hasHeader}`);

      } catch (error) {
        console.log(`  ${path}: Could not check elements - ${error.message}`);
      }

      await page.waitForTimeout(500);
    }
  });
});