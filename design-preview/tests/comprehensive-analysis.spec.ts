import { test, expect } from '@playwright/test';

test.describe('Comprehensive Analysis - Design Territories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should analyze all territory implementations', async ({ page }) => {
    const territories = ['A', 'B', 'C'];
    const views = ['Dashboard', 'Fit Queue'];
    const analysisResults = [];

    for (const territory of territories) {
      await page.click(`button:has-text("Territory ${territory}")`);
      await page.waitForTimeout(500);

      for (const view of views) {
        await page.click(`button:has-text("${view}")`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);

        const analysis = {
          territory,
          view,
          hasContent: false,
          elementCount: 0,
          hasUniqueStyling: false,
          screenshot: null,
          contentSummary: []
        };

        // Check if main content area has elements
        const mainContent = page.locator('main');
        analysis.hasContent = await mainContent.isVisible();

        // Count elements in main content
        if (analysis.hasContent) {
          analysis.elementCount = await mainContent.locator('*').count();
        }

        // Look for specific content based on territory and view
        if (territory === 'A' && view === 'Dashboard') {
          const expectedElements = [
            'Recruiter Dashboard',
            'Total Candidates',
            'Avg Fit Score',
            'Recent Candidates',
            'Sarah Johnson'
          ];

          for (const element of expectedElements) {
            const isVisible = await page.locator(`text=${element}`).isVisible().catch(() => false);
            if (isVisible) {
              analysis.contentSummary.push(element);
            }
          }
        } else if (territory === 'B' && view === 'Dashboard') {
          const expectedElements = [
            'Recruiter Dashboard',
            'Total Candidates',
            'Average Fit Score',
            'Recent Candidate Activity'
          ];

          for (const element of expectedElements) {
            const isVisible = await page.locator(`text=${element}`).isVisible().catch(() => false);
            if (isVisible) {
              analysis.contentSummary.push(element);
            }
          }
        } else if (territory === 'C' && view === 'Dashboard') {
          const expectedElements = [
            'Recruiter Dashboard',
            'Total Candidates',
            'Avg Fit Score',
            'Recent Candidates'
          ];

          for (const element of expectedElements) {
            const isVisible = await page.locator(`text=${element}`).isVisible().catch(() => false);
            if (isVisible) {
              analysis.contentSummary.push(element);
            }
          }
        } else {
          // For FitQueue views, check for any content
          const fitQueueElements = await page.locator('main').locator('div, h1, h2, h3, p, table').count();
          if (fitQueueElements > 0) {
            analysis.contentSummary.push(`${fitQueueElements} elements found`);
          }
        }

        // Take screenshot
        analysis.screenshot = await page.screenshot({
          path: `test-results/analysis/territory-${territory.toLowerCase()}-${view.toLowerCase().replace(' ', '-')}.png`,
          fullPage: true
        });

        analysisResults.push(analysis);
        console.log(`Analysis completed: Territory ${territory} - ${view}`);
      }
    }

    // Generate analysis report
    console.log('\n=== COMPREHENSIVE ANALYSIS REPORT ===');
    console.log('=====================================\n');

    analysisResults.forEach(result => {
      console.log(`Territory ${result.territory} - ${result.view}:`);
      console.log(`  ✅ Has Content: ${result.hasContent}`);
      console.log(`  📊 Element Count: ${result.elementCount}`);
      console.log(`  📝 Content Summary: ${result.contentSummary.join(', ')}`);
      console.log(`  📸 Screenshot: territory-${result.territory.toLowerCase()}-${result.view.toLowerCase().replace(' ', '-')}.png`);
      console.log('');
    });

    // Verify all territories have content
    for (const result of analysisResults) {
      expect(result.hasContent).toBe(true);
      expect(result.elementCount).toBeGreaterThan(0);
    }

    // Verify screenshots were created
    for (const result of analysisResults) {
      expect(result.screenshot).toBeTruthy();
    }
  });

  test('should check for Tailwind CSS styling', async ({ page }) => {
    // Test Territory A for Skylevel brand colors
    await page.click('button:has-text("Territory A")');
    await page.click('button:has-text("Dashboard")');
    await page.waitForTimeout(1000);

    // Check for primary color usage
    const primaryElements = await page.locator('[class*="primary-"]').count();
    console.log(`Found ${primaryElements} elements with primary colors`);

    // Check for Tailwind classes
    const tailwindElements = await page.locator('[class*="bg-"], [class*="text-"], [class*="border-"]').count();
    console.log(`Found ${tailwindElements} elements with Tailwind styling classes`);

    // Check for responsive design classes
    const responsiveElements = await page.locator('[class*="md:"], [class*="lg:"], [class*="sm:"]').count();
    console.log(`Found ${responsiveElements} elements with responsive design classes`);

    expect(tailwindElements).toBeGreaterThan(10);
  });

  test('should verify navigation functionality', async ({ page }) => {
    const territories = ['A', 'B', 'C'];
    const views = ['Dashboard', 'Fit Queue'];

    for (const territory of territories) {
      // Test territory switching
      await page.click(`button:has-text("Territory ${territory}")`);

      // Check that territory button is selected
      const territoryButton = page.locator(`button:has-text("Territory ${territory}")`);
      await expect(territoryButton).toHaveClass(/ring-2/);

      for (const view of views) {
        // Test view switching
        await page.click(`button:has-text("${view}")`);

        // Check that view button is selected
        const viewButton = page.locator(`button:has-text("${view}")`);
        await expect(viewButton).toHaveClass(/bg-gray-800/);

        // Check debug indicator
        await expect(page.locator('[data-testid="current-territory"]')).toContainText(`Territory ${territory} - ${view} View`);
      }
    }
  });

  test('should capture comparison screenshots', async ({ page }) => {
    const territories = ['A', 'B', 'C'];

    // Capture all Dashboard views for comparison
    for (const territory of territories) {
      await page.click(`button:has-text("Territory ${territory}")`);
      await page.click('button:has-text("Dashboard")');
      await page.waitForTimeout(1000);

      await page.screenshot({
        path: `test-results/comparison/territory-${territory.toLowerCase()}-dashboard-comparison.png`,
        fullPage: true
      });
    }

    // Capture all FitQueue views for comparison
    for (const territory of territories) {
      await page.click(`button:has-text("Territory ${territory}")`);
      await page.click('button:has-text("Fit Queue")');
      await page.waitForTimeout(1000);

      await page.screenshot({
        path: `test-results/comparison/territory-${territory.toLowerCase()}-fitqueue-comparison.png`,
        fullPage: true
      });
    }
  });
});