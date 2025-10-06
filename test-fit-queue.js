const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport size
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    // Navigate to the Fit Queue page
    console.log('Loading Fit Queue page...');
    await page.goto('http://localhost:3000/fit-queue', {
      waitUntil: 'networkidle2',
      timeout: 10000
    });

    // Wait for content to load
    await page.waitForSelector('h1', { timeout: 5000 });

    // Measure load time
    const loadTime = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return navigation.loadEventEnd - navigation.fetchStart;
    });

    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

    // Count candidates
    const candidateCount = await page.$$eval('.group', candidates => candidates.length);
    console.log(`Found ${candidateCount} candidates on the page`);

    // Take a screenshot
    await page.screenshot({
      path: 'fit-queue-screenshot.png',
      fullPage: true
    });

    console.log('Screenshot saved as fit-queue-screenshot.png');

    // Test filter visibility
    const filterVisible = await page.$('select') !== null;
    console.log(`Filters visible: ${filterVisible}`);

    // Test score pills
    const scorePills = await page.$$eval('[data-testid="score-pill"]', pills => pills.length);
    console.log(`Score pills found: ${scorePills}`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();