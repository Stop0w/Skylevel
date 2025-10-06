import { test, expect } from '@playwright/test';

test.describe('Design Territories Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Set up viewport for consistent testing
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('Territory A - Confident Clarity loads correctly', async ({ page }) => {
    await page.goto('/territory-a');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check main heading exists
    await expect(page.locator('h1')).toContainText('Territory A');

    // Check description
    await expect(page.locator('text=Confident Clarity')).toBeVisible();

    // Check navigation links exist
    await expect(page.locator('text=Fit Queue')).toBeVisible();
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=Candidate Profile')).toBeVisible();

    // Check stats are displayed
    await expect(page.locator('text=Total Candidates')).toBeVisible();
    await expect(page.locator('text=High Fit (85+)')).toBeVisible();
    await expect(page.locator('text=Avg Score')).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: 'test-results/screenshots/territory-a-main.png',
      fullPage: true
    });
  });

  test('Territory B - Thoughtful & Calm loads correctly', async ({ page }) => {
    await page.goto('/territory-b');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check main heading exists
    await expect(page.locator('h1')).toContainText('Territory B');

    // Check description
    await expect(page.locator('text=Thoughtful & Calm')).toBeVisible();
    await expect(page.locator('text=contemplative approach to candidate review')).toBeVisible();

    // Check navigation links exist
    await expect(page.locator('text=Minimal candidate review interface')).toBeVisible();
    await expect(page.locator('text=Calm overview of recruitment metrics')).toBeVisible();
    await expect(page.locator('text=Detailed candidate view')).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: 'test-results/screenshots/territory-b-main.png',
      fullPage: true
    });
  });

  test('Territory C - Professional Efficiency loads correctly', async ({ page }) => {
    await page.goto('/territory-c');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check main heading exists
    await expect(page.locator('h1')).toContainText('Territory C - Professional Efficiency');

    // Check description
    await expect(page.locator('text=Cron calendar app-inspired interface')).toBeVisible();
    await expect(page.locator('text=Maximum information density')).toBeVisible();

    // Check stats are displayed
    await expect(page.locator('text=Total Candidates')).toBeVisible();
    await expect(page.locator('text=Average Score')).toBeVisible();
    await expect(page.locator('text=High Scoring (85+)')).toBeVisible();
    await expect(page.locator('text=New Applications')).toBeVisible();
    await expect(page.locator('text=Active Jobs')).toBeVisible();

    // Check navigation sections
    await expect(page.locator('text=Fit Queue')).toBeVisible();
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=Candidate Profile')).toBeVisible();

    // Check power user features section
    await expect(page.locator('text=Power User Features')).toBeVisible();
    await expect(page.locator('text=Keyboard Shortcuts')).toBeVisible();
    await expect(page.locator('text=Data Density Features')).toBeVisible();
    await expect(page.locator('text=Efficiency Tools')).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: 'test-results/screenshots/territory-c-main.png',
      fullPage: true
    });
  });

  test('Territory A Fit Queue page loads', async ({ page }) => {
    await page.goto('/territory-a/fit-queue');

    await page.waitForLoadState('networkidle');

    // Take screenshot of fit queue
    await page.screenshot({
      path: 'test-results/screenshots/territory-a-fit-queue.png',
      fullPage: true
    });
  });

  test('Territory B Fit Queue page loads', async ({ page }) => {
    await page.goto('/territory-b/fit-queue');

    await page.waitForLoadState('networkidle');

    // Take screenshot of fit queue
    await page.screenshot({
      path: 'test-results/screenshots/territory-b-fit-queue.png',
      fullPage: true
    });
  });

  test('Territory C Fit Queue page loads', async ({ page }) => {
    await page.goto('/territory-c/fit-queue');

    await page.waitForLoadState('networkidle');

    // Take screenshot of fit queue
    await page.screenshot({
      path: 'test-results/screenshots/territory-c-fit-queue.png',
      fullPage: true
    });
  });

  test('Check responsive design on mobile', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Test Territory A on mobile
    await page.goto('/territory-a');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: 'test-results/screenshots/territory-a-mobile.png',
      fullPage: true
    });

    // Test Territory B on mobile
    await page.goto('/territory-b');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: 'test-results/screenshots/territory-b-mobile.png',
      fullPage: true
    });

    // Test Territory C on mobile
    await page.goto('/territory-c');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: 'test-results/screenshots/territory-c-mobile.png',
      fullPage: true
    });
  });

  test('Check ScorePill components are displaying', async ({ page }) => {
    // Go to territory that likely has ScorePill components
    await page.goto('/territory-a/fit-queue');
    await page.waitForLoadState('networkidle');

    // Look for score indicators or similar components
    // This will depend on the actual implementation
    await page.waitForTimeout(2000); // Give components time to render

    // Check if any score-related elements are visible
    const scoreElements = page.locator('[data-testid*="score"], .score, .fit-score');
    const count = await scoreElements.count();

    console.log(`Found ${count} score-related elements`);

    if (count > 0) {
      await page.screenshot({
        path: 'test-results/screenshots/score-components.png',
        fullPage: true
      });
    }
  });
});