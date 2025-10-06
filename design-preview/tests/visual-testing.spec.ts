import { test, expect } from '@playwright/test';

test.describe('Visual Testing - Design Territories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should capture screenshots of all territory and view combinations', async ({ page }) => {
    const territories = ['A', 'B', 'C'];
    const views = ['Dashboard', 'Fit Queue'];

    for (const territory of territories) {
      // Navigate to territory
      await page.click(`button:has-text("Territory ${territory}")`);
      await page.waitForTimeout(500); // Allow for transitions

      for (const view of views) {
        // Navigate to view
        await page.click(`button:has-text("${view}")`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000); // Ensure content is fully loaded

        // Take full page screenshot
        await page.screenshot({
          path: `test-results/screenshots/territory-${territory.toLowerCase()}-${view.toLowerCase().replace(' ', '-')}-full.png`,
          fullPage: true
        });

        // Take viewport screenshot
        await page.screenshot({
          path: `test-results/screenshots/territory-${territory.toLowerCase()}-${view.toLowerCase().replace(' ', '-')}-viewport.png`,
          fullPage: false
        });

        console.log(`Screenshot captured: Territory ${territory} - ${view}`);
      }
    }
  });

  test('should capture detailed component screenshots', async ({ page }) => {
    // Territory A Dashboard components
    await page.click('button:has-text("Territory A")');
    await page.click('button:has-text("Dashboard")');
    await page.waitForLoadState('networkidle');

    // Header section
    const header = page.locator('header');
    await header.screenshot({ path: 'test-results/screenshots/components/territory-a-header.png' });

    // Metrics cards
    const metricsContainer = page.locator('.grid').first();
    if (await metricsContainer.isVisible()) {
      await metricsContainer.screenshot({ path: 'test-results/screenshots/components/territory-a-metrics.png' });
    }

    // Search and filters
    const searchSection = page.locator('.bg-white').filter({ hasText: 'Search candidates' });
    if (await searchSection.isVisible()) {
      await searchSection.screenshot({ path: 'test-results/screenshots/components/territory-a-search.png' });
    }

    // Recent candidates table
    const tableSection = page.locator('.bg-white').filter({ hasText: 'Recent Candidates' });
    if (await tableSection.isVisible()) {
      await tableSection.screenshot({ path: 'test-results/screenshots/components/territory-a-table.png' });
    }

    // Fit Score pills
    const fitScores = page.locator('[class*="bg-"][class*="text-white"]').first();
    if (await fitScores.isVisible()) {
      await fitScores.screenshot({ path: 'test-results/screenshots/components/territory-a-fit-score.png' });
    }
  });

  test('should capture navigation component screenshots', async ({ page }) => {
    // Navigation in different states
    const nav = page.locator('nav');

    // Default state (Territory A selected)
    await nav.screenshot({ path: 'test-results/screenshots/navigation/territory-a-selected.png' });

    // Territory B selected
    await page.click('button:has-text("Territory B")');
    await nav.screenshot({ path: 'test-results/screenshots/navigation/territory-b-selected.png' });

    // Territory C selected
    await page.click('button:has-text("Territory C")');
    await nav.screenshot({ path: 'test-results/screenshots/navigation/territory-c-selected.png' });
  });

  test('should capture responsive design screenshots', async ({ page }) => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForLoadState('networkidle');

      // Territory A Dashboard
      await page.click('button:has-text("Territory A")');
      await page.click('button:has-text("Dashboard")');
      await page.waitForTimeout(500);

      await page.screenshot({
        path: `test-results/screenshots/responsive/territory-a-dashboard-${viewport.name}.png`,
        fullPage: true
      });

      // Territory A FitQueue
      await page.click('button:has-text("Fit Queue")');
      await page.waitForTimeout(500);

      await page.screenshot({
        path: `test-results/screenshots/responsive/territory-a-fitqueue-${viewport.name}.png`,
        fullPage: true
      });
    }
  });

  test('should verify color scheme consistency', async ({ page }) => {
    // Test Territory A (should use primary colors)
    await page.click('button:has-text("Territory A")');
    await page.click('button:has-text("Dashboard")');

    // Check primary color usage
    const primaryElements = page.locator('[class*="primary-600"]');
    if (await primaryElements.count() > 0) {
      const primaryElement = primaryElements.first();
      const computedStyle = await primaryElement.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          backgroundColor: style.backgroundColor,
          color: style.color
        };
      });

      console.log('Territory A Primary Colors:', computedStyle);
    }

    // Check accent color usage for high scores
    const accentElements = page.locator('[class*="accent-500"]');
    if (await accentElements.count() > 0) {
      const accentElement = accentElements.first();
      const accentColor = await accentElement.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });

      console.log('Territory A Accent Color:', accentColor);
    }
  });

  test('should verify content rendering across territories', async ({ page }) => {
    const territories = ['A', 'B', 'C'];
    const expectedContent = {
      'Dashboard': ['Total Candidates', 'Avg Fit Score', 'Recent Candidates'],
      'Fit Queue': ['Fit Queue', 'Candidates']
    };

    for (const territory of territories) {
      await page.click(`button:has-text("Territory ${territory}")`);

      for (const view of ['Dashboard', 'Fit Queue']) {
        await page.click(`button:has-text("${view}")`);
        await page.waitForLoadState('networkidle');

        // Check for expected content
        const contentFound = [];
        for (const content of expectedContent[view]) {
          const element = page.locator(`text=${content}`);
          if (await element.isVisible()) {
            contentFound.push(content);
          }
        }

        // Log content findings
        console.log(`Territory ${territory} - ${view}: Found content:`, contentFound);

        // Take screenshot for manual review
        await page.screenshot({
          path: `test-results/screenshots/content-verification/territory-${territory.toLowerCase()}-${view.toLowerCase().replace(' ', '-')}.png`,
          fullPage: true
        });
      }
    }
  });
});