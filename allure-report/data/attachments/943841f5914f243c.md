# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q1-locked-user.spec.js >> Q1 - Locked User Page Tests Validation >> Verify that user can see error message while logging with locked_out_user
- Location: tests\q1-locked-user.spec.js:13:5

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://www.saucedemo.com/
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "domcontentloaded"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import HomePage from '../pageObjects/HomePage';
  3  | import { users } from '../fixtures/users.js';
  4  | 
  5  | test.describe('Q1 - Locked User Page Tests Validation', () => {
  6  |     let home;
  7  | 
  8  |     test.beforeEach(async ({ page }) => {
> 9  |         await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
     |                    ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://www.saucedemo.com/
  10 |         home = new HomePage(page);
  11 |     });
  12 | 
  13 |     test('Verify that user can see error message while logging with locked_out_user', async ({ page }) => {
  14 | 
  15 |         await home.doLogin(users.lockedUser.username, users.lockedUser.password);
  16 |         const errorText = await home.getErrorMessage();
  17 |         expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  18 |     });
  19 | 
  20 | 
  21 |     test('Verify that user can see the title of this site', async ({ page }) => {
  22 |         await expect(page).toHaveTitle(/Swag/);
  23 |     });
  24 | 
  25 | 
  26 | });
  27 | 
  28 | 
  29 | 
  30 | 
```