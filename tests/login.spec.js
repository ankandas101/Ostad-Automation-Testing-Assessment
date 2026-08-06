import { test, describe, expect } from '@playwright/test';
import HomePage from '../pageObjects/HomePage';
import { users } from '../fixtures/users.js';
test.describe('Login Page Tests', () => {
    let home;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
        home = new HomePage(page);
    });

    test('Verify that user can login with standard_user ', async ({ page }) => {

        await home.doLogin(users.standardUser.username, users.standardUser.password);
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/.*inventory/, { timeout: 5000 });
    });


    test('Verify that user can see error message while logging with locked_out_user', async ({ page }) => {

        await home.doLogin("locked_out_user", "secret_sauce");
        const errorText = await home.getErrorMessage();
        expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
    });

});



