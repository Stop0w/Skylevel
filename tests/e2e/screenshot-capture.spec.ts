import { test, expect } from '@playwright/test';

test.describe('Skylevel Screenshot Capture Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
  });

  test('capture landing page screenshots', async ({ page }) => {
    await expect(page).toHaveScreenshot('landing-page-dark-theme.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('capture territories navigation page', async ({ page }) => {
    await page.click('a[href="/territories"]');
    await page.waitForURL('**/territories');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('territories-navigation.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('capture all territory combinations', async ({ page }) => {
    await page.goto('http://localhost:5173/territories');
    await page.waitForLoadState('networkidle');

    const territories = ['A', 'B', 'C'];
    const views = ['dashboard', 'fit-queue'];

    for (const territory of territories) {
      // Select territory
      await page.click(`button:has-text("Territory ${territory}")`);
      await page.waitForTimeout(500);

      for (const view of views) {
        // Select view
        await page.click(`button:has-text("${view === 'dashboard' ? 'Dashboard' : 'Fit Queue'}")`);
        await page.waitForTimeout(1000);

        // Capture screenshot
        await expect(page).toHaveScreenshot(`territory-${territory}-${view}.png`, {
          fullPage: true,
          animations: 'disabled'
        });
      }
    }
  });

  test('capture responsive screenshots', async ({ page }) => {
    await page.goto('http://localhost:5173/territories');
    await page.waitForLoadState('networkidle');

    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];

    // Test Territory A Dashboard on different viewports
    await page.click('button:has-text("Territory A")');
    await page.waitForTimeout(500);
    await page.click('button:has-text("Dashboard")');
    await page.waitForTimeout(1000);

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(`territory-A-dashboard-${viewport.name}.png`, {
        fullPage: true,
        animations: 'disabled'
      });
    }
  });

  test('capture design system verification', async ({ page }) => {
    await page.goto('http://localhost:5173/territories');
    await page.waitForLoadState('networkidle');

    // Verify dark theme background
    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(backgroundColor).toBe('rgb(10, 6, 6)'); // #0A0606

    // Capture screenshot for design system verification
    await expect(page).toHaveScreenshot('design-system-verification.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('capture ScorePill examples', async ({ page }) => {
    await page.goto('http://localhost:5173/territories');
    await page.waitForLoadState('networkidle');

    // Navigate to Territory A Fit Queue (most likely to have ScorePills)
    await page.click('button:has-text("Territory A")');
    await page.waitForTimeout(500);
    await page.click('button:has-text("Fit Queue")');
    await page.waitForTimeout(1000);

    // Look for score-related elements
    const scoreElements = page.locator('[class*="score"], .text-[0-9]');
    const count = await scoreElements.count();

    if (count > 0) {
      // Capture the first score element found
      await expect(scoreElements.first()).toHaveScreenshot('score-pill-example.png', {
        animations: 'disabled'
      });
    }

    // Capture full page
    await expect(page).toHaveScreenshot('territory-A-fit-queue-full.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });
});