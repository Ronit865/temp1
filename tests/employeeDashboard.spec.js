const { test, expect } = require('@playwright/test');

test.describe('Employee Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('http://localhost:3000/login');
  });

  test('Login as employee and verify dashboard theme and details', async ({ page }) => {
    // Login as employee 'masum'
    await page.fill('input[placeholder="Username"]', 'masum');
    await page.fill('input[placeholder="Password"]', 'emp'); // Assuming password 'emp' for testing
    await page.selectOption('select', 'employee');
    await page.click('button:has-text("Login")');

    // Wait for navigation to employee dashboard
    await page.waitForURL('**/employee');

    // Check page header blurry navbar style
    const header = await page.locator('.page-header');
    const backdropFilter = await header.evaluate(el => getComputedStyle(el).backdropFilter);
    expect(backdropFilter).toContain('blur');

    // Check employee name displayed
    await expect(page.locator('.employee-details .detail-row >> text=Masum Desai')).toBeVisible();

    // Check button styles
    const primaryBtn = page.locator('.btn-primary');
    await expect(primaryBtn).toHaveCSS('background-image', /linear-gradient/);

    // Check footer text
    await expect(page.locator('.page-footer')).toContainText('© 2024 Tech Solutions Inc.');
  });
});
