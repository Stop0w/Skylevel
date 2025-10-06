import { Page, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for network idle and ensure page is stable
   */
  async waitForPageStable(timeout = 10000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
    await this.page.waitForTimeout(500); // Additional wait for animations
  }

  /**
   * Navigate to a specific territory and view
   */
  async navigateToTerritory(territory: 'A' | 'B' | 'C', view: 'dashboard' | 'fit-queue'): Promise<void> {
    await this.page.goto('http://localhost:5173/territories');
    await this.waitForPageStable();

    // Select territory
    await this.page.click(`button:has-text("Territory ${territory}")`);
    await this.page.waitForTimeout(500);

    // Select view
    await this.page.click(`button:has-text("${view === 'dashboard' ? 'Dashboard' : 'Fit Queue'}")`);
    await this.waitForPageStable();
  }

  /**
   * Verify design system colors
   */
  async verifyDesignSystemColors(): Promise<void> {
    const colors = await this.page.evaluate(() => {
      const computedStyles = window.getComputedStyle(document.body);
      return {
        background: computedStyles.backgroundColor,
        color: computedStyles.color
      };
    });

    expect(colors.background).toBe('rgb(10, 6, 6)'); // #0A0606
    expect(colors.color).toBe('rgb(245, 242, 232)'); // #F5F2E8
  }

  /**
   * Check accessibility of interactive elements
   */
  async checkInteractiveElementsAccessibility(): Promise<void> {
    const interactiveElements = this.page.locator('button, a, input, select, textarea');
    const count = await interactiveElements.count();

    for (let i = 0; i < count; i++) {
      const element = interactiveElements.nth(i);

      // Check if element has proper accessibility attributes
      const hasAriaLabel = await element.getAttribute('aria-label');
      const hasAriaLabelledBy = await element.getAttribute('aria-labelledby');
      const hasTitle = await element.getAttribute('title');
      const hasText = await element.textContent();

      // At least one of these should be present for accessibility
      const hasAccessibleName = hasAriaLabel || hasAriaLabelledBy || hasTitle || (hasText && hasText.trim().length > 0);

      if (await element.isVisible()) {
        expect(hasAccessibleName).toBeTruthy();
      }
    }
  }

  /**
   * Take a full page screenshot with consistent naming
   */
  async takeScreenshot(name: string, options = { fullPage: true, animations: 'disabled' as const }): Promise<void> {
    await expect(this.page).toHaveScreenshot(name, options);
  }

  /**
   * Verify responsive behavior at different viewport sizes
   */
  async testResponsiveViewports(screenshotName: string): Promise<void> {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];

    for (const viewport of viewports) {
      await this.page.setViewportSize(viewport);
      await this.waitForPageStable();
      await this.takeScreenshot(`${screenshotName}-${viewport.name}.png`);
    }
  }

  /**
   * Check color contrast ratios for WCAG compliance
   */
  async checkColorContrast(): Promise<void> {
    const contrastResults = await this.page.evaluate(() => {
      const getLuminance = (rgb: number[]) => {
        const [r, g, b] = rgb.map(val => {
          val = val / 255;
          return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };

      const getContrastRatio = (rgb1: number[], rgb2: number[]) => {
        const lum1 = getLuminance(rgb1);
        const lum2 = getLuminance(rgb2);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
      };

      const rgbToNumbers = (rgb: string) => {
        const match = rgb.match(/\d+/g);
        return match ? match.map(Number) : [0, 0, 0];
      };

      // Get background and text colors
      const bodyStyles = window.getComputedStyle(document.body);
      const bgColor = rgbToNumbers(bodyStyles.backgroundColor);
      const textColor = rgbToNumbers(bodyStyles.color);

      const contrastRatio = getContrastRatio(bgColor, textColor);

      return {
        backgroundColor: bodyStyles.backgroundColor,
        textColor: bodyStyles.color,
        contrastRatio: Math.round(contrastRatio * 100) / 100,
        passesWCAG_AA: contrastRatio >= 4.5,
        passesWCAG_AAA: contrastRatio >= 7
      };
    });

    console.log('Contrast ratio results:', contrastResults);
    expect(contrastResults.passesWCAG_AA).toBeTruthy();
  }

  /**
   * Verify territory-specific design elements
   */
  async verifyTerritoryDesign(territory: 'A' | 'B' | 'C'): Promise<void> {
    const designExpectations = {
      A: {
        buttonColor: 'rgb(139, 21, 56)', // primary-600
        hasBoldElements: true,
        hasHighContrast: true
      },
      B: {
        buttonColor: 'rgb(212, 175, 55)', // accent-600
        hasMinimalElements: true,
        hasCalmColors: true
      },
      C: {
        buttonColor: 'rgb(203, 213, 225)', // neutral-300
        hasDenseElements: true,
        hasCompactLayout: true
      }
    };

    const expectation = designExpectations[territory];

    // Check active territory button color
    const activeButton = this.page.locator(`button:has-text("Territory ${territory}")`);
    const actualColor = await activeButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    expect(actualColor).toBe(expectation.buttonColor);
  }

  /**
   * Check for console errors during test execution
   */
  async checkForConsoleErrors(): Promise<void> {
    const errors: string[] = [];

    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit to catch any delayed errors
    await this.page.waitForTimeout(1000);

    if (errors.length > 0) {
      console.error('Console errors detected:', errors);
      throw new Error(`Console errors found: ${errors.join(', ')}`);
    }
  }

  /**
   * Generate accessibility audit report
   */
  async generateAccessibilityReport(): Promise<any> {
    const report = await this.page.evaluate(() => {
      // Basic accessibility checks
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const images = document.querySelectorAll('img');
      const links = document.querySelectorAll('a');
      const buttons = document.querySelectorAll('button');

      const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.substring(1)));
      const hasProperHeadingHierarchy = headingLevels.every((level, index) => {
        if (index === 0) return level === 1; // First heading should be h1
        return level <= headingLevels[index - 1] + 1; // Should not skip levels
      });

      const imagesWithAlt = Array.from(images).filter(img => img.hasAttribute('alt'));
      const linksWithHref = Array.from(links).filter(link => link.hasAttribute('href'));
      const buttonsWithText = Array.from(buttons).filter(button => {
        return button.textContent?.trim().length > 0 ||
               button.getAttribute('aria-label') ||
               button.getAttribute('title');
      });

      return {
        totalHeadings: headings.length,
        properHeadingHierarchy: hasProperHeadingHierarchy,
        totalImages: images.length,
        imagesWithAlt: imagesWithAlt.length,
        imagesWithoutAlt: images.length - imagesWithAlt.length,
        totalLinks: links.length,
        linksWithHref: linksWithHref.length,
        totalButtons: buttons.length,
        buttonsWithAccessibleName: buttonsWithText.length,
        accessibilityScore: Math.round(
          ((hasProperHeadingHierarchy ? 1 : 0) +
           (imagesWithAlt.length / Math.max(images.length, 1)) +
           (linksWithHref.length / Math.max(links.length, 1)) +
           (buttonsWithText.length / Math.max(buttons.length, 1))) * 25
        )
      };
    });

    console.log('Accessibility Report:', report);
    return report;
  }
}

/**
 * Custom matchers for design system verification
 */
export const customMatchers = {
  async toHaveDesignSystemColor(received: Page, expectedColor: string) {
    const actualColor = await received.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    const pass = actualColor === expectedColor;

    return {
      message: () => `expected ${actualColor} ${pass ? 'not ' : ''}to be ${expectedColor}`,
      pass
    };
  },

  async toHaveProperContrastRatio(received: Page, minimumRatio = 4.5) {
    const contrastInfo = await received.evaluate(() => {
      const getLuminance = (rgb: number[]) => {
        const [r, g, b] = rgb.map(val => {
          val = val / 255;
          return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };

      const getContrastRatio = (rgb1: number[], rgb2: number[]) => {
        const lum1 = getLuminance(rgb1);
        const lum2 = getLuminance(rgb2);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
      };

      const rgbToNumbers = (rgb: string) => {
        const match = rgb.match(/\d+/g);
        return match ? match.map(Number) : [0, 0, 0];
      };

      const bodyStyles = window.getComputedStyle(document.body);
      const bgColor = rgbToNumbers(bodyStyles.backgroundColor);
      const textColor = rgbToNumbers(bodyStyles.color);

      return getContrastRatio(bgColor, textColor);
    });

    const pass = contrastInfo >= minimumRatio;

    return {
      message: () => `expected contrast ratio ${contrastInfo.toFixed(2)} ${pass ? 'not ' : ''}to be at least ${minimumRatio}`,
      pass
    };
  }
};