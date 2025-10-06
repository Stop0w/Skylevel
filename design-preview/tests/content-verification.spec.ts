import { test, expect } from '@playwright/test';

test.describe('Content Verification - Design Territories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Territory A Content Verification', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('button:has-text("Territory A")');
    });

    test('should render Territory A Dashboard with complete content', async ({ page }) => {
      await page.click('button:has-text("Dashboard")');
      await page.waitForTimeout(1000);

      // Check main heading
      await expect(page.locator('h1:has-text("Recruiter Dashboard")')).toBeVisible();

      // Check metrics section
      await expect(page.locator('text=Total Candidates')).toBeVisible();
      await expect(page.locator('text=Avg Fit Score')).toBeVisible();
      await expect(page.locator('text=Review Rate')).toBeVisible();
      await expect(page.locator('text=Shortlisted')).toBeVisible();

      // Check metric values
      await expect(page.locator('text=247')).toBeVisible(); // Total Candidates
      await expect(page.locator('text=73.2')).toBeVisible(); // Avg Fit Score
      await expect(page.locator('text=89%')).toBeVisible(); // Review Rate
      await expect(page.locator('text=18')).toBeVisible(); // Shortlisted

      // Check search functionality
      await expect(page.locator('input[placeholder*="Search candidates"]')).toBeVisible();
      await expect(page.locator('text=All Status')).toBeVisible();
      await expect(page.locator('button:has-text("More Filters")')).toBeVisible();

      // Check candidates table
      await expect(page.locator('text=Recent Candidates')).toBeVisible();
      await expect(page.locator('th:has-text("Candidate")')).toBeVisible();
      await expect(page.locator('th:has-text("Role")')).toBeVisible();
      await expect(page.locator('th:has-text("Fit Score")')).toBeVisible();
      await expect(page.locator('th:has-text("Status")')).toBeVisible();

      // Check specific candidates
      await expect(page.locator('text=Sarah Johnson')).toBeVisible();
      await expect(page.locator('text=Senior Frontend Developer')).toBeVisible();
      await expect(page.locator('text=92')).toBeVisible(); // Fit Score

      // Check Post New Job button
      await expect(page.locator('button:has-text("Post New Job")')).toBeVisible();

      // Check View All Candidates button
      await expect(page.locator('button:has-text("View All Candidates")')).toBeVisible();
    });

    test('should have working Fit Score color coding', async ({ page }) => {
      await page.click('button:has-text("Dashboard")');

      // High score (85+) - should be gold/accent
      const highScore = page.locator('text=92');
      if (await highScore.isVisible()) {
        const highScoreParent = highScore.locator('..');
        await expect(highScoreParent).toHaveClass(/bg-accent-500/);
      }

      // Medium score (70-84) - should be green
      const mediumScore = page.locator('text=79');
      if (await mediumScore.isVisible()) {
        const mediumScoreParent = mediumScore.locator('..');
        await expect(mediumScoreParent).toHaveClass(/bg-green-500/);
      }

      // Lower score (50-69) - should be orange
      const lowScore = page.locator('text=71');
      if (await lowScore.isVisible()) {
        const lowScoreParent = lowScore.locator('..');
        await expect(lowScoreParent).toHaveClass(/bg-orange-500/);
      }
    });

    test('should have working status indicators', async ({ page }) => {
      await page.click('button:has-text("Dashboard")');

      // Check status badges
      await expect(page.locator('text=New')).toBeVisible();
      await expect(page.locator('text=Reviewing')).toBeVisible();
      await expect(page.locator('text=Shortlisted')).toBeVisible();

      // Check status colors
      const newStatus = page.locator('text=New').locator('..');
      await expect(newStatus).toHaveClass(/bg-blue-100/);

      const reviewingStatus = page.locator('text=Reviewing').locator('..');
      await expect(reviewingStatus).toHaveClass(/bg-yellow-100/);

      const shortlistedStatus = page.locator('text=Shortlisted').locator('..');
      await expect(shortlistedStatus).toHaveClass(/bg-green-100/);
    });

    test('should render Territory A FitQueue with content', async ({ page }) => {
      await page.click('button:has-text("Fit Queue")');
      await page.waitForTimeout(1000);

      // Check that content is rendered
      await expect(page.locator('main')).toBeVisible();

      // Look for FitQueue specific content
      const contentElements = await page.locator('main').locator('*').count();
      expect(contentElements).toBeGreaterThan(5); // Should have multiple elements
    });
  });

  test.describe('Territory B Content Verification', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('button:has-text("Territory B")');
    });

    test('should render Territory B Dashboard', async ({ page }) => {
      await page.click('button:has-text("Dashboard")');
      await page.waitForTimeout(1000);

      // Check that Territory B has content
      await expect(page.locator('main')).toBeVisible();

      // Count rendered elements
      const contentElements = await page.locator('main').locator('*').count();
      expect(contentElements).toBeGreaterThan(0);

      // Take screenshot for manual verification
      await page.screenshot({
        path: 'test-results/territory-b-dashboard-content.png',
        fullPage: true
      });
    });

    test('should render Territory B FitQueue', async ({ page }) => {
      await page.click('button:has-text("Fit Queue")');
      await page.waitForTimeout(1000);

      // Check that content is rendered
      await expect(page.locator('main')).toBeVisible();

      // Count rendered elements
      const contentElements = await page.locator('main').locator('*').count();
      expect(contentElements).toBeGreaterThan(0);

      // Take screenshot for manual verification
      await page.screenshot({
        path: 'test-results/territory-b-fitqueue-content.png',
        fullPage: true
      });
    });
  });

  test.describe('Territory C Content Verification', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('button:has-text("Territory C")');
    });

    test('should render Territory C Dashboard', async ({ page }) => {
      await page.click('button:has-text("Dashboard")');
      await page.waitForTimeout(1000);

      // Check that Territory C has content
      await expect(page.locator('main')).toBeVisible();

      // Count rendered elements
      const contentElements = await page.locator('main').locator('*').count();
      expect(contentElements).toBeGreaterThan(0);

      // Take screenshot for manual verification
      await page.screenshot({
        path: 'test-results/territory-c-dashboard-content.png',
        fullPage: true
      });
    });

    test('should render Territory C FitQueue', async ({ page }) => {
      await page.click('button:has-text("Fit Queue")');
      await page.waitForTimeout(1000);

      // Check that content is rendered
      await expect(page.locator('main')).toBeVisible();

      // Count rendered elements
      const contentElements = await page.locator('main').locator('*').count();
      expect(contentElements).toBeGreaterThan(0);

      // Take screenshot for manual verification
      await page.screenshot({
        path: 'test-results/territory-c-fitqueue-content.png',
        fullPage: true
      });
    });
  });

  test.describe('Cross-Territory Content Comparison', () => {
    test('should have different content between territories', async ({ page }) => {
      const screenshots = [];
      const territories = ['A', 'B', 'C'];

      for (const territory of territories) {
        await page.click(`button:has-text("Territory ${territory}")`);
        await page.click('button:has-text("Dashboard")');
        await page.waitForTimeout(1000);

        const screenshot = await page.screenshot();
        screenshots.push(screenshot);
      }

      // Verify that territories have different visual content
      for (let i = 0; i < screenshots.length - 1; i++) {
        expect(screenshots[i]).not.toEqual(screenshots[i + 1]);
      }
    });

    test('should maintain consistent navigation across territories', async ({ page }) => {
      const territories = ['A', 'B', 'C'];

      for (const territory of territories) {
        await page.click(`button:has-text("Territory ${territory}")`);

        // Check that navigation is always visible
        await expect(page.locator('nav')).toBeVisible();
        await expect(page.locator('h1:has-text("Skylevel Design Territories")')).toBeVisible();

        // Check that all territory buttons are visible
        await expect(page.locator('button:has-text("Territory A")')).toBeVisible();
        await expect(page.locator('button:has-text("Territory B")')).toBeVisible();
        await expect(page.locator('button:has-text("Territory C")')).toBeVisible();

        // Check that view buttons are visible
        await expect(page.locator('button:has-text("Dashboard")')).toBeVisible();
        await expect(page.locator('button:has-text("Fit Queue")')).toBeVisible();
      }
    });

    test('should update debug indicator correctly', async ({ page }) => {
      const territories = ['A', 'B', 'C'];
      const views = ['Dashboard', 'Fit Queue'];

      for (const territory of territories) {
        for (const view of views) {
          await page.click(`button:has-text("Territory ${territory}")`);
          await page.click(`button:has-text("${view}")`);
          await page.waitForTimeout(500);

          await expect(page.locator('[data-testid="current-territory"]')).toContainText(`Territory ${territory} - ${view} View`);
        }
      }
    });
  });
});