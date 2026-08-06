# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q1-locked-user.spec.js >> Q1 - Locked User Page Tests Validation >> Verify that user can see error message while logging with locked_out_user
- Location: tests/q1-locked-user.spec.js:12:9

# Error details

```
ReferenceError: users is not defined
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { test, describe, expect } from '@playwright/test';
  2  | import HomePage from '../pageObjects/HomePage';
  3  | 
  4  | test.describe('Q1 - Locked User Page Tests Validation', () => {
  5  |     let home;
  6  | 
  7  |     test.beforeEach(async ({ page }) => {
  8  |         await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
  9  |         home = new HomePage(page);
  10 |     });
  11 | 
  12 |     test('Verify that user can see error message while logging with locked_out_user', async ({ page }) => {
  13 | 
> 14 |         await home.doLogin(users.lockedUser.username, users.lockedUser.password);
     |                            ^ ReferenceError: users is not defined
  15 |         const errorText = await home.getErrorMessage();
  16 |         expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  17 |     });
  18 | 
  19 | 
  20 |     test('Verify that user can see the title of this site', async ({ page }) => {
  21 |         await expect(page).toHaveTitle(/Swag/);
  22 |     });
  23 | 
  24 | 
  25 | });
  26 | 
  27 | 
  28 | 
  29 | 
```