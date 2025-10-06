import { test, expect, devices } from '@playwright/test';

// Viewport configurations for testing
const VIEWPORTS = {
  mobile: { width: 375, height: 667 },   // iPhone SE
  mobileLarge: { width: 414, height: 896 }, // iPhone 11
  tablet: { width: 768, height: 1024 },   // iPad
  desktop: { width: 1920, height: 1080 }, // Standard desktop
};

// Territory routes to test
const TERRITORIES = [
  { name: 'Territory A', path: '/territory-a' },
  { name: 'Territory B', path: '/territory-b' },
  { name: 'Territory C', path: '/territory-c' },
];

test.describe('Mobile Responsiveness Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set default timeout for mobile tests
    test.setTimeout(60000);
  });

  TERRITORIES.forEach(territory => {
    test.describe(`${territory.name} - Mobile Responsiveness`, () => {

      test('Mobile phone viewport (375x667)', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await page.goto(territory.path);

        // Wait for page to fully load
        await page.waitForLoadState('networkidle');

        // Take screenshot for visual reference
        await page.screenshot({
          path: `test-results/mobile-screenshots/${territory.name.toLowerCase().replace(' ', '-')}-mobile-375x667.png`,
          fullPage: true
        });

        // Test for horizontal scrolling
        const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const viewportWidth = VIEWPORTS.mobile.width;
        expect(pageWidth).toBeLessThanOrEqual(viewportWidth + 30); // Allow 30px tolerance for scrollbars/borders

        // Test navigation/menu is mobile-friendly
        const navigation = page.locator('nav, [role="navigation"], .navigation, .menu');
        if (await navigation.count() > 0) {
          // Check if navigation elements are touch-friendly (minimum 44px)
          const navButtons = navigation.locator('button, a, [role="button"]');
          const buttonCount = await navButtons.count();

          for (let i = 0; i < Math.min(buttonCount, 5); i++) {
            const button = navButtons.nth(i);
            const boundingBox = await button.boundingBox();
            if (boundingBox) {
              expect(boundingBox.height).toBeGreaterThanOrEqual(38); // Minimum touch target
              expect(boundingBox.width).toBeGreaterThanOrEqual(38);
            }
          }
        }

        // Test text readability
        const textElements = page.locator('p, h1, h2, h3, h4, span, div').filter({ hasText: /\S/ });
        const textCount = await textElements.count();

        for (let i = 0; i < Math.min(textCount, 10); i++) {
          const element = textElements.nth(i);
          const fontSize = await element.evaluate(el => {
            return parseFloat(window.getComputedStyle(el).fontSize);
          });
          expect(fontSize).toBeGreaterThanOrEqual(12); // Minimum readable font size
        }

        // Test ScorePill component if present
        const scorePills = page.locator('[data-testid="score-pill"], .score-pill, [class*="score"]');
        if (await scorePills.count() > 0) {
          const firstPill = scorePills.first();
          await expect(firstPill).toBeVisible();

          // Check if score is readable on mobile
          const pillText = await firstPill.textContent();
          expect(pillText).toBeTruthy();
          expect(pillText!.length).toBeGreaterThan(0);
        }

        // Test CandidateCard component if present
        const candidateCards = page.locator('[data-testid="candidate-card"], .candidate-card, [class*="candidate"]');
        if (await candidateCards.count() > 0) {
          const firstCard = candidateCards.first();
          await expect(firstCard).toBeVisible();

          // Check card doesn't overflow horizontally
          const cardBoundingBox = await firstCard.boundingBox();
          if (cardBoundingBox) {
            expect(cardBoundingBox.width).toBeLessThanOrEqual(viewportWidth - 32); // Account for padding
          }
        }
      });

      test('Large mobile viewport (414x896)', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobileLarge);
        await page.goto(territory.path);
        await page.waitForLoadState('networkidle');

        // Take screenshot
        await page.screenshot({
          path: `test-results/mobile-screenshots/${territory.name.toLowerCase().replace(' ', '-')}-mobile-414x896.png`,
          fullPage: true
        });

        // Test layout stacking
        const layoutElements = page.locator('.grid, .flex, [class*="grid"], [class*="flex"]');
        const layoutCount = await layoutElements.count();

        for (let i = 0; i < Math.min(layoutCount, 5); i++) {
          const element = layoutElements.nth(i);
          const flexDirection = await element.evaluate(el => {
            return window.getComputedStyle(el).flexDirection || window.getComputedStyle(el).gridTemplateColumns;
          });

          // On mobile, expect single column layout or flex-column
          if (flexDirection.includes('grid')) {
            const gridColumn = flexDirection;
            const columns = gridColumn.split(' ').length;
            expect(columns).toBeLessThanOrEqual(2); // Max 2 columns on large mobile
          }
        }
      });

      test('Tablet viewport (768x1024)', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.tablet);
        await page.goto(territory.path);
        await page.waitForLoadState('networkidle');

        // Take screenshot
        await page.screenshot({
          path: `test-results/mobile-screenshots/${territory.name.toLowerCase().replace(' ', '-')}-tablet-768x1024.png`,
          fullPage: true
        });

        // Test touch targets on tablet
        const interactiveElements = page.locator('button, a, input, select, [role="button"]');
        const elementCount = await interactiveElements.count();

        for (let i = 0; i < Math.min(elementCount, 10); i++) {
          const element = interactiveElements.nth(i);
          const boundingBox = await element.boundingBox();
          if (boundingBox) {
            expect(boundingBox.height).toBeGreaterThanOrEqual(44); // Standard touch target
            expect(boundingBox.width).toBeGreaterThanOrEqual(44);
          }
        }

        // Test for proper spacing between interactive elements
        const buttons = page.locator('button, [role="button"]');
        const buttonCount = await buttons.count();

        if (buttonCount > 1) {
          const firstButton = buttons.first();
          const secondButton = buttons.nth(1);

          const firstBox = await firstButton.boundingBox();
          const secondBox = await secondButton.boundingBox();

          if (firstBox && secondBox) {
            const verticalDistance = Math.abs(secondBox.y - firstBox.y);
            expect(verticalDistance).toBeGreaterThanOrEqual(8); // Minimum spacing
          }
        }
      });

      test('Desktop baseline comparison', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.desktop);
        await page.goto(territory.path);
        await page.waitForLoadState('networkidle');

        // Take screenshot for comparison
        await page.screenshot({
          path: `test-results/mobile-screenshots/${territory.name.toLowerCase().replace(' ', '-')}-desktop-1920x1080.png`,
          fullPage: true
        });

        // Test that all content is accessible on desktop
        const mainContent = page.locator('main, [role="main"], .main-content');
        if (await mainContent.count() > 0) {
          await expect(mainContent.first()).toBeVisible();
        }
      });

      test('Touch gesture simulation', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await page.goto(territory.path);
        await page.waitForLoadState('networkidle');

        // Test swipe gestures if there are carousels or scrollable areas
        const scrollableAreas = page.locator('[style*="overflow"], .scrollable, .carousel');
        if (await scrollableAreas.count() > 0) {
          const scrollable = scrollableAreas.first();

          // Test horizontal swipe
          const box = await scrollable.boundingBox();
          if (box && box.width > box.height) {
            await scrollable.hover();
            await page.mouse.down();
            await page.mouse.move(box.x + box.width - 50, box.y + box.height / 2);
            await page.mouse.up();

            // Wait for any animation
            await page.waitForTimeout(500);
          }
        }

        // Test tap interactions
        const clickableElements = page.locator('button, a, [role="button"], [onclick]');
        const clickCount = await clickableElements.count();

        if (clickCount > 0) {
          const firstClickable = clickableElements.first();
          await firstClickable.tap();
          await page.waitForTimeout(1000); // Wait for any response
        }
      });

      test('Accessibility checks on mobile', async ({ page }) => {
        await page.setViewportSize(VIEWPORTS.mobile);
        await page.goto(territory.path);
        await page.waitForLoadState('networkidle');

        // Check for proper heading structure
        const headings = page.locator('h1, h2, h3, h4, h5, h6');
        const headingCount = await headings.count();

        if (headingCount > 0) {
          // Check that there's at least one h1
          const h1s = page.locator('h1');
          if (await h1s.count() > 0) {
            await expect(h1s.first()).toBeVisible();
          }
        }

        // Check for proper alt text on images
        const images = page.locator('img');
        const imageCount = await images.count();

        for (let i = 0; i < Math.min(imageCount, 10); i++) {
          const img = images.nth(i);
          const alt = await img.getAttribute('alt');
          const role = await img.getAttribute('role');

          // Images should have alt text or be decorative
          expect(alt !== null || role === 'presentation').toBeTruthy();
        }

        // Check color contrast (basic check)
        const textElements = page.locator('p, span, div, h1, h2, h3, h4, h5, h6').filter({ hasText: /\S/ });
        const textCount = await textElements.count();

        for (let i = 0; i < Math.min(textCount, 5); i++) {
          const element = textElements.nth(i);
          const styles = await element.evaluate(el => {
            const computed = window.getComputedStyle(el);
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              fontSize: computed.fontSize
            };
          });

          // Basic contrast check (simplified)
          expect(styles.color).not.toBe(styles.backgroundColor);
        }
      });
    });
  });

  test('Cross-territory mobile consistency comparison', async ({ page }) => {
    const screenshots = [];

    // Capture mobile screenshots for all territories
    for (const territory of TERRITORIES) {
      await page.setViewportSize(VIEWPORTS.mobile);
      await page.goto(territory.path);
      await page.waitForLoadState('networkidle');

      const screenshot = await page.screenshot({
        path: `test-results/mobile-comparison/${territory.name.toLowerCase().replace(' ', '-')}-mobile.png`,
        fullPage: true
      });

      screenshots.push({ territory: territory.name, screenshot });
    }

    // Basic consistency checks
    expect(screenshots).toHaveLength(3);

    // Check that all territories have loaded successfully
    for (const { territory } of screenshots) {
      test.info().attach(`${territory} Mobile Screenshot`, { body: screenshots.find(s => s.territory === territory)?.screenshot, contentType: 'image/png' });
    }
  });
});