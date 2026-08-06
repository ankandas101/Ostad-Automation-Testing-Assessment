import { test, describe, expect } from '@playwright/test';
import HomePage from '../pageObjects/HomePage';
import { users } from '../fixtures/users.js';

test.describe('Q1 - Locked User Page Tests Validation', () => {
    let home;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
        home = new HomePage(page);
    });

    test('Verify that user can see error message while logging with locked_out_user', async ({ page }) => {

        await home.doLogin(users.lockedUser.username, users.lockedUser.password);
        const errorText = await home.getErrorMessage();
        expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
    });


    test('Verify that user can see the title of this site', async ({ page }) => {
        await expect(page).toHaveTitle(/Swag/);
    });


});



