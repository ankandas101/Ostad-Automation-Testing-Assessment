import { test, describe, expect } from '@playwright/test';
import HomePage from '../pageObjects/HomePage';

test.describe('Login Page Tests', () => {
    let home;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
        home = new HomePage(page);
    });

    test('Verify that user can login with standard_user ', async ({ page }) => {

        await home.doLogin("standard_user", "secret_sauce");
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/.*inventory/,{ timeout: 5000 });
    });


    test('Verify that user can see error message while logging with locked_out_user', async ({ page }) => {

        await home.doLogin("locked_out_user", "secret_sauce");
        const errorText = await home.getErrorMessage();
        expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
    });


    test('Verify that user can see title of this site', async ({ page }) => {
        await expect(page).toHaveTitle(/Swag/);
    });


});



