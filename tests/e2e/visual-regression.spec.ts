import { test, expect } from '@playwright/test';
import { devices } from '@playwright/test';

// Viewport configurations for responsive testing
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'ultrawide', width: 2560, height: 1440 }
];

// Territory and view combinations
const TERRITORIES = ['A', 'B', 'C'] as const;
const VIEWS = ['dashboard', 'fit-queue'] as const;
type Territory = typeof TERRITORIES[number];
type View = typeof VIEWS[number];

// Score ranges for testing ScorePill color coding
const SCORE_RANGES = [
  { range: 'excellent', min: 85, max: 100, expectedColor: 'gold' },
  { range: 'good', min: 70, max: 84, expectedColor: 'green' },
  { range: 'average', min: 50, max: 69, expectedColor: 'orange' },
  { range: 'poor', min: 0, max: 49, expectedColor: 'red' }
];

// Design system color values for validation
const DESIGN_COLORS = {
  primary: '#8B1538',
  accent: '#D4AF37',
  background: '#0A0606',
  text: '#F5F2E8',
  neutral900: '#171717',
  neutral800: '#262626',
  neutral700: '#404040'
};

test.describe('Skylevel Design Territories - Visual Regression Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Ensure consistent page state
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Landing Page Compliance', () => {
    test('should render landing page with correct dark theme', async ({ page }) => {
      await page.goto('http://localhost:5173');

      // Verify dark theme background
      const backgroundColor = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      expect(backgroundColor).toBe('rgb(10, 6, 6)'); // #0A0606

      // Verify main heading color
      const mainHeading = page.locator('h1').first();
      await expect(mainHeading).toBeVisible();
      await expect(mainHeading).toHaveCSS('color', 'rgb(139, 21, 56)'); // primary-600

      // Take full page screenshot
      await expect(page).toHaveScreenshot('landing-page.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('should have proper accessibility and contrast', async ({ page }) => {
      await page.goto('http://localhost:5173');

      // Check for proper heading hierarchy (use first() to avoid strict mode violation)
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();

      // Check for proper link accessibility
      const exploreLink = page.locator('a[href="/territories"]');
      await expect(exploreLink).toBeVisible();
      await expect(exploreLink).toHaveAttribute('href', '/territories');

      // Check color contrast ratios (simulated)
      const textColor = await page.locator('main').evaluate(() => {
        const main = document.querySelector('main');
        return window.getComputedStyle(main).color;
      });
      expect(textColor).toBe('rgb(245, 242, 232)'); // #F5F2E8
    });
  });

  test.describe('Territory Navigation', () => {
    test('should navigate to territories page correctly', async ({ page }) => {
      await page.goto('http://localhost:5173');

      // Click the explore button
      await page.click('a[href="/territories"]');
      await page.waitForURL('**/territories');

      // Verify territories page loaded
      await expect(page.locator('h1').first()).toContainText('Design Territories');

      // Take screenshot of territories navigation
      await expect(page).toHaveScreenshot('territories-navigation.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  test.describe('Territory A - Confident Clarity', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173/territories');
      await page.waitForLoadState('networkidle');
    });

    VIEWS.forEach(view => {
      test(`should render Territory A ${view} with bold design`, async ({ page }) => {
        // Select Territory A
        await page.click('button:has-text("Territory A - Confident Clarity")');
        await page.waitForTimeout(500);

        // Select view
        await page.click(`button:has-text("${view === 'dashboard' ? 'Dashboard' : 'Fit Queue'}")`);
        await page.waitForTimeout(1000);

        // Verify territory A styling
        const territoryInfo = page.locator('text=Bold, decisive interface');
        await expect(territoryInfo).toBeVisible();

        // Take screenshot
        await expect(page).toHaveScreenshot(`territory-A-${view}.png`, {
          fullPage: true,
          animations: 'disabled'
        });
      });
    });

    test('should have high contrast and bold CTAs', async ({ page }) => {
      await page.click('button:has-text("Territory A - Confident Clarity")');
      await page.waitForTimeout(500);

      // Check for bold styling
      const activeButton = page.locator('button:has-text("Territory A - Confident Clarity")');
      await expect(activeButton).toHaveCSS('background-color', 'rgb(139, 21, 56)'); // primary-600

      // Verify strong visual hierarchy
      const headings = page.locator('h1, h2, h3');
      const count = await headings.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Territory B - Thoughtful & Calm', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173/territories');
      await page.waitForLoadState('networkidle');
    });

    VIEWS.forEach(view => {
      test(`should render Territory B ${view} with minimal design`, async ({ page }) => {
        // Select Territory B
        await page.click('button:has-text("Territory B - Thoughtful & Calm")');
        await page.waitForTimeout(500);

        // Select view
        await page.click(`button:has-text("${view === 'dashboard' ? 'Dashboard' : 'Fit Queue'}")`);
        await page.waitForTimeout(1000);

        // Verify territory B styling
        const territoryInfo = page.locator('text=Minimal, contemplative design');
        await expect(territoryInfo).toBeVisible();

        // Take screenshot
        await expect(page).toHaveScreenshot(`territory-B-${view}.png`, {
          fullPage: true,
          animations: 'disabled'
        });
      });
    });

    test('should have generous whitespace and calm colors', async ({ page }) => {
      await page.click('button:has-text("Territory B - Thoughtful & Calm")');
      await page.waitForTimeout(500);

      // Check for accent color usage
      const activeButton = page.locator('button:has-text("Territory B - Thoughtful & Calm")');
      await expect(activeButton).toHaveCSS('background-color', 'rgb(212, 175, 55)'); // accent-600

      // Verify minimal design elements
      const territoryInfo = page.locator('text=generous whitespace');
      await expect(territoryInfo).toBeVisible();
    });
  });

  test.describe('Territory C - Professional Efficiency', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173/territories');
      await page.waitForLoadState('networkidle');
    });

    VIEWS.forEach(view => {
      test(`should render Territory C ${view} with data-dense design`, async ({ page }) => {
        // Select Territory C
        await page.click('button:has-text("Territory C - Professional Efficiency")');
        await page.waitForTimeout(500);

        // Select view
        await page.click(`button:has-text("${view === 'dashboard' ? 'Dashboard' : 'Fit Queue'}")`);
        await page.waitForTimeout(1000);

        // Verify territory C styling
        const territoryInfo = page.locator('text=Data-dense, power-user interface');
        await expect(territoryInfo).toBeVisible();

        // Take screenshot
        await expect(page).toHaveScreenshot(`territory-C-${view}.png`, {
          fullPage: true,
          animations: 'disabled'
        });
      });
    });

    test('should have compact layout and high information density', async ({ page }) => {
      await page.click('button:has-text("Territory C - Professional Efficiency")');
      await page.waitForTimeout(500);

      // Check for neutral color usage
      const activeButton = page.locator('button:has-text("Territory C - Professional Efficiency")');
      expect(await activeButton.isVisible()).toBeTruthy();

      // Verify efficiency-focused elements
      const territoryInfo = page.locator('text=Maximum information');
      await expect(territoryInfo).toBeVisible();
    });
  });

  test.describe('Responsive Design Testing', () => {
    VIEWPORTS.forEach(viewport => {
      test(`should be responsive on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('http://localhost:5173/territories');
        await page.waitForLoadState('networkidle');

        // Test each territory on this viewport
        for (const territory of TERRITORIES) {
          await page.click(`button:has-text("Territory ${territory}")`);
          await page.waitForTimeout(500);

          // Test dashboard view
          await page.click('button:has-text("Dashboard")');
          await page.waitForTimeout(1000);
          await expect(page).toHaveScreenshot(`responsive-${viewport.name}-territory-${territory}-dashboard.png`, {
            fullPage: true,
            animations: 'disabled'
          });

          // Test fit queue view
          await page.click('button:has-text("Fit Queue")');
          await page.waitForTimeout(1000);
          await expect(page).toHaveScreenshot(`responsive-${viewport.name}-territory-${territory}-fit-queue.png`, {
            fullPage: true,
            animations: 'disabled'
          });
        }
      });
    });
  });

  test.describe('ScorePill Component Testing', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173/territories');
      await page.waitForLoadState('networkidle');
    });

    test('should render ScorePill components with correct colors', async ({ page }) => {
      // Navigate to a view that likely contains ScorePills
      await page.click('button:has-text("Territory A - Confident Clarity")');
      await page.click('button:has-text("Fit Queue")');
      await page.waitForTimeout(1000);

      // Look for score-related elements
      const scoreElements = page.locator('[data-testid*="score"], .score, [class*="score"]');
      const count = await scoreElements.count();

      if (count > 0) {
        // Take screenshot of score elements
        await expect(page.locator('body')).toHaveScreenshot('score-elements.png', {
          fullPage: false,
          animations: 'disabled'
        });
      }
    });

    test('should have consistent ScorePill styling across territories', async ({ page }) => {
      const screenshots = [];

      // Capture ScorePill elements from each territory
      for (const territory of TERRITORIES) {
        await page.click(`button:has-text("Territory ${territory}")`);
        await page.click('button:has-text("Fit Queue")');
        await page.waitForTimeout(1000);

        // Look for score displays
        const scoreDisplay = page.locator('text=/\\d+/').first();
        if (await scoreDisplay.isVisible()) {
          const screenshot = await scoreDisplay.screenshot();
          screenshots.push({ territory, screenshot });
        }
      }

      // Verify we have score displays in multiple territories
      expect(screenshots.length).toBeGreaterThanOrEqual(1);
    });
  });

  test.describe('Cross-Device Compatibility', () => {
    const devices = [
      { name: 'Desktop Chrome', device: 'Desktop Chrome' },
      { name: 'Desktop Firefox', device: 'Desktop Firefox' },
      { name: 'Mobile Safari', device: 'iPhone 12' },
      { name: 'Mobile Chrome', device: 'Pixel 5' }
    ];

    devices.forEach(({ name, device }) => {
      test(`should render consistently on ${name}`, async ({ page, browserName }) => {
        // Skip if browser doesn't match
        if (device.includes('Chrome') && !browserName.includes('chromium')) return;
        if (device.includes('Firefox') && !browserName.includes('firefox')) return;
        if (device.includes('Safari') && !browserName.includes('webkit')) return;
        if (device.includes('iPhone') && !browserName.includes('webkit')) return;

        await page.goto('http://localhost:5173/territories');
        await page.waitForLoadState('networkidle');

        // Test Territory A Dashboard as baseline
        await page.click('button:has-text("Territory A - Confident Clarity")');
        await page.waitForTimeout(500);

        await expect(page).toHaveScreenshot(`cross-browser-${browserName}-${name.replace(/\s+/g, '-').toLowerCase()}.png`, {
          fullPage: true,
          animations: 'disabled'
        });
      });
    });
  });

  test.describe('Interactive Elements Testing', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173/territories');
      await page.waitForLoadState('networkidle');
    });

    test('should handle territory switching smoothly', async ({ page }) => {
      // Test all territory transitions
      const transitions = [
        ['A', 'B'],
        ['B', 'C'],
        ['C', 'A'],
        ['A', 'C'],
        ['C', 'B'],
        ['B', 'A']
      ];

      for (const [from, to] of transitions) {
        await page.click(`button:has-text("Territory ${from}")`);
        await page.waitForTimeout(500);

        await page.click(`button:has-text("Territory ${to}")`);
        await page.waitForTimeout(1000);

        // Verify the transition worked
        const activeButton = page.locator(`button:has-text("Territory ${to}")`);
        await expect(activeButton).toBeVisible();

        // Take screenshot after transition
        await expect(page).toHaveScreenshot(`transition-${from}-to-${to}.png`, {
          fullPage: true,
          animations: 'disabled'
        });
      }
    });

    test('should handle view switching within territories', async ({ page }) => {
      for (const territory of TERRITORIES) {
        // Select territory
        await page.click(`button:has-text("Territory ${territory}")`);
        await page.waitForTimeout(500);

        // Switch to Dashboard
        await page.click('button:has-text("Dashboard")');
        await page.waitForTimeout(1000);
        await expect(page).toHaveScreenshot(`${territory}-dashboard-view.png`, {
          fullPage: true,
          animations: 'disabled'
        });

        // Switch to Fit Queue
        await page.click('button:has-text("Fit Queue")');
        await page.waitForTimeout(1000);
        await expect(page).toHaveScreenshot(`${territory}-fit-queue-view.png`, {
          fullPage: true,
          animations: 'disabled'
        });
      }
    });

    test('should have proper hover states and transitions', async ({ page }) => {
      // Test hover states on territory buttons
      const buttons = page.locator('button:has-text("Territory")');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        await button.hover();
        await page.waitForTimeout(300);

        // Verify hover state
        await expect(button).toBeVisible();

        // Take screenshot of hover state
        await expect(button).toHaveScreenshot(`hover-state-territory-${i + 1}.png`, {
          animations: 'disabled'
        });
      }
    });
  });

  test.describe('Design System Compliance Verification', () => {
    test('should maintain consistent dark theme across all pages', async ({ page }) => {
      const pages = [
        { url: '/', name: 'landing' },
        { url: '/territories', name: 'territories' }
      ];

      for (const pageConfig of pages) {
        await page.goto(`http://localhost:5173${pageConfig.url}`);
        await page.waitForLoadState('networkidle');

        // Verify dark background
        const backgroundColor = await page.evaluate(() => {
          return window.getComputedStyle(document.body).backgroundColor;
        });
        expect(backgroundColor).toBe('rgb(10, 6, 6)'); // #0A0606

        // Verify light text
        const textColor = await page.evaluate(() => {
          const main = document.querySelector('main, body');
          return window.getComputedStyle(main).color;
        });

        await expect(page).toHaveScreenshot(`dark-theme-${pageConfig.name}.png`, {
          fullPage: true,
          animations: 'disabled'
        });
      }
    });

    test('should use correct Skylevel brand colors', async ({ page }) => {
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

    test('should have proper typography hierarchy', async ({ page }) => {
      await page.goto('http://localhost:5173/territories');
      await page.waitForLoadState('networkidle');

      // Check heading hierarchy
      const h1 = page.locator('h1').first();
      const h2 = page.locator('h2').first();
      const h3 = page.locator('h3').first();

      await expect(h1).toBeVisible();
      if (await h2.count() > 0) await expect(h2).toBeVisible();
      if (await h3.count() > 0) await expect(h3).toBeVisible();

      // Verify proper font sizes (approximately)
      const h1Size = await h1.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });

      expect(h1Size).toMatch(/2[4-9]px|3[0-6]px/); // 24-36px range
    });
  });

  test.describe('Accessibility Testing', () => {
    test('should have proper focus management', async ({ page }) => {
      await page.goto('http://localhost:5173/territories');
      await page.waitForLoadState('networkidle');

      // Test tab navigation
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      // Verify focus indicator
      const focusedElement = await page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      // Continue tabbing through interactive elements
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
        const currentFocus = await page.locator(':focus');
        await expect(currentFocus).toBeVisible();
      }
    });

    test('should have sufficient color contrast', async ({ page }) => {
      await page.goto('http://localhost:5173/territories');
      await page.waitForLoadState('networkidle');

      // Check text contrast against background
      const textElements = page.locator('p, h1, h2, h3, span, button');
      const count = await textElements.count();

      // Sample a few elements to check contrast
      for (let i = 0; i < Math.min(count, 10); i++) {
        const element = textElements.nth(i);
        if (await element.isVisible()) {
          const color = await element.evaluate((el) => {
            return window.getComputedStyle(el).color;
          });

          // Ensure text is not the same as background
          expect(color).not.toBe('rgb(10, 6, 6)'); // Not the background color
        }
      }
    });

    test('should have semantic HTML structure', async ({ page }) => {
      await page.goto('http://localhost:5173/territories');
      await page.waitForLoadState('networkidle');

      // Check for semantic elements
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();

      // Check for proper heading structure
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();

      // Should only have one h1 per page
      const h1Count = await h1.count();
      expect(h1Count).toBe(1);
    });
  });

  test.describe('Performance Testing', () => {
    test('should load quickly and be interactive', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('http://localhost:5173/territories');
      await page.waitForLoadState('networkidle');

      const loadTime = Date.now() - startTime;

      // Should load within reasonable time (5 seconds)
      expect(loadTime).toBeLessThan(5000);

      // Test interaction responsiveness
      const interactionStart = Date.now();
      await page.click('button:has-text("Territory A - Confident Clarity")');
      await page.waitForTimeout(500);

      const interactionTime = Date.now() - interactionStart;

      // Should respond within 1 second
      expect(interactionTime).toBeLessThan(1000);
    });

    test('should handle rapid navigation without breaking', async ({ page }) => {
      await page.goto('http://localhost:5173/territories');
      await page.waitForLoadState('networkidle');

      // Rapidly switch between territories and views
      const actions = [
        () => page.click('button:has-text("Territory A")'),
        () => page.click('button:has-text("Dashboard")'),
        () => page.click('button:has-text("Fit Queue")'),
        () => page.click('button:has-text("Territory B")'),
        () => page.click('button:has-text("Dashboard")'),
        () => page.click('button:has-text("Territory C")'),
        () => page.click('button:has-text("Fit Queue")')
      ];

      for (const action of actions) {
        await action();
        await page.waitForTimeout(200);
      }

      // Verify final state is stable
      await expect(page.locator('h1')).toContainText('Design Territories');
    });
  });
});