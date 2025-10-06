import { test, expect } from '@playwright/test';

test.describe('Simple Page Status Check', () => {
  const pages = [
    { name: 'Homepage', path: '/' },
    { name: 'Candidate Dashboard', path: '/candidate/dashboard' },
    { name: 'Candidate Profile', path: '/candidate/profile' },
    { name: 'Jobs Listing', path: '/jobs' },
    { name: 'Job Detail Page', path: '/jobs/1' },
    { name: 'Job Application Page', path: '/jobs/1/apply' },
    { name: 'Referral Page', path: '/referral/abc123' },
    { name: 'Fit Queue Page', path: '/fit-queue' }
  ];

  pages.forEach(page => {
    test(`${page.name} (${page.path})`, async ({ page: browserPage }) => {
      console.log(`\nTesting: ${page.name} - ${page.path}`);

      try {
        const response = await browserPage.goto(page.path, {
          waitUntil: 'domcontentloaded',
          timeout: 15000
        });

        const status = response?.status();
        const ok = response?.ok();
        const title = await browserPage.title();

        console.log(`Status: ${status}, OK: ${ok}`);
        console.log(`Title: ${title}`);

        // Take screenshot
        await browserPage.screenshot({
          path: `test-results/screenshots/${page.name.replace(/\s+/g, '-').toLowerCase()}.png`,
          fullPage: true
        });

        // Check for error content
        const has404 = await browserPage.locator('text=404').count() > 0;
        const has500 = await browserPage.locator('text=500').count() > 0;

        console.log(`Error indicators: 404=${has404}, 500=${has500}`);

        expect(status).toBe(200);
        expect(ok).toBe(true);
        expect(has404).toBe(false);
        expect(has500).toBe(false);

      } catch (error) {
        console.error(`Error testing ${page.name}: ${error.message}`);
        throw error;
      }
    });
  });
});