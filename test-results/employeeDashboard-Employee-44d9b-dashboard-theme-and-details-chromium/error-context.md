# Test info

- Name: Employee Dashboard >> Login as employee and verify dashboard theme and details
- Location: C:\Users\rajdh\OneDrive\Desktop\temp\temp1\tests\employeeDashboard.spec.js:9:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\rajdh\AppData\Local\ms-playwright\chromium_headless_shell-1169\chrome-win\headless_shell.exe
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | test.describe('Employee Dashboard', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to login page
   6 |     await page.goto('http://localhost:3000/login');
   7 |   });
   8 |
>  9 |   test('Login as employee and verify dashboard theme and details', async ({ page }) => {
     |   ^ Error: browserType.launch: Executable doesn't exist at C:\Users\rajdh\AppData\Local\ms-playwright\chromium_headless_shell-1169\chrome-win\headless_shell.exe
  10 |     // Login as employee 'masum'
  11 |     await page.fill('input[placeholder="Username"]', 'masum');
  12 |     await page.fill('input[placeholder="Password"]', 'emp'); // Assuming password 'emp' for testing
  13 |     await page.selectOption('select', 'employee');
  14 |     await page.click('button:has-text("Login")');
  15 |
  16 |     // Wait for navigation to employee dashboard
  17 |     await page.waitForURL('**/employee');
  18 |
  19 |     // Check page header blurry navbar style
  20 |     const header = await page.locator('.page-header');
  21 |     const backdropFilter = await header.evaluate(el => getComputedStyle(el).backdropFilter);
  22 |     expect(backdropFilter).toContain('blur');
  23 |
  24 |     // Check employee name displayed
  25 |     await expect(page.locator('.employee-details .detail-row >> text=Masum Desai')).toBeVisible();
  26 |
  27 |     // Check button styles
  28 |     const primaryBtn = page.locator('.btn-primary');
  29 |     await expect(primaryBtn).toHaveCSS('background-image', /linear-gradient/);
  30 |
  31 |     // Check footer text
  32 |     await expect(page.locator('.page-footer')).toContainText('© 2024 Tech Solutions Inc.');
  33 |   });
  34 | });
  35 |
```