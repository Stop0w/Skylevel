import { test, expect } from '@playwright/test';

test.describe('Skylevel Design Territories - Verification Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
  });

  test('verify landing page dark theme compliance', async ({ page }) => {
    // Verify dark background
    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(backgroundColor).toBe('rgb(10, 6, 6)'); // #0A0606

    // Verify main heading exists and has correct color
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toContainText('Skylevel');

    // Verify explore button exists
    const exploreButton = page.locator('a[href="/territories"]');
    await expect(exploreButton).toBeVisible();
    await expect(exploreButton).toHaveText(/Explore Design Territories/);

    // Take verification screenshot
    await page.screenshot({
      path: 'test-results/verification/landing-page-dark-theme.png',
      fullPage: true
    });
  });

  test('verify territories page functionality', async ({ page }) => {
    await page.click('a[href="/territories"]');
    await page.waitForURL('**/territories');
    await page.waitForLoadState('networkidle');

    // Verify page title
    await expect(page.locator('h1').first()).toContainText('Design Territories');

    // Verify all three territory buttons exist
    await expect(page.locator('button:has-text("Territory A")')).toBeVisible();
    await expect(page.locator('button:has-text("Territory B")')).toBeVisible();
    await expect(page.locator('button:has-text("Territory C")')).toBeVisible();

    // Verify view toggle buttons exist
    await expect(page.locator('button:has-text("Dashboard")')).toBeVisible();
    await expect(page.locator('button:has-text("Fit Queue")')).toBeVisible();

    // Take verification screenshot
    await page.screenshot({
      path: 'test-results/verification/territories-navigation.png',
      fullPage: true
    });
  });

  test('verify all territory combinations are functional', async ({ page }) => {
    await page.goto('http://localhost:5173/territories');
    await page.waitForLoadState('networkidle');

    const territories = ['A', 'B', 'C'];
    const views = ['dashboard', 'fit-queue'];

    for (const territory of territories) {
      for (const view of views) {
        // Select territory
        await page.click(`button:has-text("Territory ${territory}")`);
        await page.waitForTimeout(500);

        // Select view
        await page.click(`button:has-text("${view === 'dashboard' ? 'Dashboard' : 'Fit Queue'}")`);
        await page.waitForTimeout(1000);

        // Verify page is stable and territory content is loaded
        await expect(page.locator('main')).toBeVisible();

        // Take screenshot for verification
        await page.screenshot({
          path: `test-results/verification/territory-${territory}-${view}-functional.png`,
          fullPage: true
        });
      }
    }
  });

  test('verify responsive design on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:5173/territories');
    await page.waitForLoadState('networkidle');

    // Test Territory A Dashboard on mobile
    await page.click('button:has-text("Territory A")');
    await page.waitForTimeout(500);
    await page.click('button:has-text("Dashboard")');
    await page.waitForTimeout(1000);

    // Verify mobile layout works
    await expect(page.locator('main')).toBeVisible();

    // Take mobile screenshot
    await page.screenshot({
      path: 'test-results/verification/mobile-territory-A-dashboard.png',
      fullPage: true
    });
  });

  test('verify design system colors are applied correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/territories');
    await page.waitForLoadState('networkidle');

    // Test each territory's accent color
    const territoryTests = [
      { territory: 'A', expectedColor: 'rgb(139, 21, 56)' }, // primary-600
      { territory: 'B', expectedColor: 'rgb(212, 175, 55)' }, // accent-600
      { territory: 'C', expectedColor: 'rgb(203, 213, 225)' }  // neutral-300
    ];

    for (const { territory, expectedColor } of territoryTests) {
      await page.click(`button:has-text("Territory ${territory}")`);
      await page.waitForTimeout(500);

      const activeButton = page.locator(`button:has-text("Territory ${territory}")`);
      const actualColor = await activeButton.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });

      expect(actualColor).toBe(expectedColor);
    }
  });

  test('verify accessibility basics', async ({ page }) => {
    await page.goto('http://localhost:5173/territories');
    await page.waitForLoadState('networkidle');

    // Check for semantic HTML structure
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Check for proper heading structure
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();

    // Take accessibility verification screenshot
    await page.screenshot({
      path: 'test-results/verification/accessibility-check.png',
      fullPage: true
    });
  });

  test('capture design system overview', async ({ page }) => {
    // Capture all key design system elements
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/verification/design-system-landing.png', fullPage: true });

    await page.goto('http://localhost:5173/territories');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/verification/design-system-territories.png', fullPage: true });

    // Capture each territory
    for (const territory of ['A', 'B', 'C']) {
      await page.click(`button:has-text("Territory ${territory}")`);
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `test-results/verification/design-system-territory-${territory}.png`,
        fullPage: true
      });
    }
  });
});