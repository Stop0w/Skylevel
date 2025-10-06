import { test, expect } from '@playwright/test';

test.describe('Design Territories Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Application Initialization', () => {
    test('should load the main application', async ({ page }) => {
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('h1:has-text("Skylevel Design Territories")')).toBeVisible();
    });

    test('should show Territory A Dashboard by default', async ({ page }) => {
      await expect(page.locator('[data-testid="current-territory"]')).toContainText('Territory A - Dashboard View');
    });

    test('should display all three territory options', async ({ page }) => {
      await expect(page.locator('button:has-text("Territory A")')).toBeVisible();
      await expect(page.locator('button:has-text("Territory B")')).toBeVisible();
      await expect(page.locator('button:has-text("Territory C")')).toBeVisible();
    });

    test('should display both view options', async ({ page }) => {
      await expect(page.locator('button:has-text("Dashboard")')).toBeVisible();
      await expect(page.locator('button:has-text("Fit Queue")')).toBeVisible();
    });
  });

  test.describe('Territory Navigation', () => {
    test('should switch between territories', async ({ page }) => {
      // Test Territory B
      await page.click('button:has-text("Territory B")');
      await expect(page.locator('[data-testid="current-territory"]')).toContainText('Territory B - Dashboard View');

      // Test Territory C
      await page.click('button:has-text("Territory C")');
      await expect(page.locator('[data-testid="current-territory"]')).toContainText('Territory C - Dashboard View');

      // Test back to Territory A
      await page.click('button:has-text("Territory A")');
      await expect(page.locator('[data-testid="current-territory"]')).toContainText('Territory A - Dashboard View');
    });

    test('should switch between Dashboard and FitQueue views', async ({ page }) => {
      // Switch to FitQueue
      await page.click('button:has-text("Fit Queue")');
      await expect(page.locator('[data-testid="current-territory"]')).toContainText('Territory A - FitQueue View');

      // Switch back to Dashboard
      await page.click('button:has-text("Dashboard")');
      await expect(page.locator('[data-testid="current-territory"]')).toContainText('Territory A - Dashboard View');
    });

    test('should maintain territory selection when switching views', async ({ page }) => {
      // Select Territory B
      await page.click('button:has-text("Territory B")');
      await expect(page.locator('[data-testid="current-territory"]')).toContainText('Territory B - Dashboard View');

      // Switch to FitQueue
      await page.click('button:has-text("Fit Queue")');
      await expect(page.locator('[data-testid="current-territory"]')).toContainText('Territory B - FitQueue View');

      // Switch back to Dashboard
      await page.click('button:has-text("Dashboard")');
      await expect(page.locator('[data-testid="current-territory"]')).toContainText('Territory B - Dashboard View');
    });
  });

  test.describe('Territory A - Confident Clarity', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('button:has-text("Territory A")');
    });

    test('should render Territory A Dashboard with correct styling', async ({ page }) => {
      await page.click('button:has-text("Dashboard")');

      // Check for specific Territory A elements
      await expect(page.locator('h1:has-text("Recruiter Dashboard")')).toBeVisible();
      await expect(page.locator('text=Total Candidates')).toBeVisible();
      await expect(page.locator('text=Avg Fit Score')).toBeVisible();
      await expect(page.locator('text=Recent Candidates')).toBeVisible();

      // Check for Skylevel brand colors (primary-600 should be #8B1538)
      const headerElement = page.locator('header');
      await expect(headerElement).toHaveCSS('border-bottom-color', 'rgb(139, 21, 56)');
    });

    test('should display Fit Score pills with correct colors', async ({ page }) => {
      await page.click('button:has-text("Dashboard")');

      // Check for Fit Score elements
      const fitScoreElements = page.locator('[class*="bg-"][class*="text-white"]');
      await expect(fitScoreElements.first()).toBeVisible();

      // Verify score ranges and colors
      const highScore = page.locator('text=92');
      const mediumScore = page.locator('text=79');
      const lowScore = page.locator('text=71');

      if (await highScore.count() > 0) {
        const highScoreParent = highScore.locator('..');
        await expect(highScoreParent).toHaveClass(/bg-accent-500/);
      }
    });

    test('should render Territory A FitQueue', async ({ page }) => {
      await page.click('button:has-text("Fit Queue")');

      // Check that FitQueue content is rendered
      await expect(page.locator('main')).toBeVisible();
    });
  });

  test.describe('Territory B - Thoughtful & Calm', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('button:has-text("Territory B")');
    });

    test('should render Territory B Dashboard', async ({ page }) => {
      await page.click('button:has-text("Dashboard")');

      // Check that Territory B content is rendered
      await expect(page.locator('main')).toBeVisible();
    });

    test('should render Territory B FitQueue', async ({ page }) => {
      await page.click('button:has-text("Fit Queue")');

      // Check that FitQueue content is rendered
      await expect(page.locator('main')).toBeVisible();
    });
  });

  test.describe('Territory C - Professional Efficiency', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('button:has-text("Territory C")');
    });

    test('should render Territory C Dashboard', async ({ page }) => {
      await page.click('button:has-text("Dashboard")');

      // Check that Territory C content is rendered
      await expect(page.locator('main')).toBeVisible();
    });

    test('should render Territory C FitQueue', async ({ page }) => {
      await page.click('button:has-text("Fit Queue")');

      // Check that FitQueue content is rendered
      await expect(page.locator('main')).toBeVisible();
    });
  });

  test.describe('Visual Consistency', () => {
    test('should have distinct visual differences between territories', async ({ page }) => {
      const screenshots = [];

      // Take screenshots of each territory
      for (const territory of ['A', 'B', 'C']) {
        await page.click(`button:has-text("Territory ${territory}")`);
        await page.waitForLoadState('networkidle');

        const screenshot = await page.screenshot();
        screenshots.push(screenshot);
      }

      // Verify that screenshots are different (basic pixel comparison)
      for (let i = 0; i < screenshots.length - 1; i++) {
        expect(screenshots[i]).not.toEqual(screenshots[i + 1]);
      }
    });

    test('should maintain responsive design', async ({ page }) => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.locator('nav')).toBeVisible();

      // Test tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.locator('nav')).toBeVisible();

      // Test desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.locator('nav')).toBeVisible();
    });
  });

  test.describe('Interactive Elements', () => {
    test('should have working territory selection buttons', async ({ page }) => {
      const territoryButtons = ['Territory A', 'Territory B', 'Territory C'];

      for (const territory of territoryButtons) {
        await page.click(`button:has-text("${territory}")`);

        // Check that the button has active state
        const button = page.locator(`button:has-text("${territory}")`);
        await expect(button).toHaveClass(/ring-2/);
      }
    });

    test('should have working view selection buttons', async ({ page }) => {
      const viewButtons = ['Dashboard', 'Fit Queue'];

      for (const view of viewButtons) {
        await page.click(`button:has-text("${view}")`);

        // Check that the button has active state
        const button = page.locator(`button:has-text("${view}")`);
        await expect(button).toHaveClass(/bg-gray-800/);
      }
    });

    test('should have hover states on interactive elements', async ({ page }) => {
      const button = page.locator('button:has-text("Territory A")');
      await button.hover();
      // Check for hover effect (scale transform)
      await expect(button).toHaveCSS('transform', /scale/);
    });
  });
});