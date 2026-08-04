import { test, describe, expect } from '@playwright/test';
import HomePage from '../pageObjects/HomePage';
import Products from '../pageObjects/Products';

test.describe('Q2 - Standard User Purchase Flow', () => {
    let home, products;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
        home = new HomePage(page);
        products = new Products(page);
    });

    test('Verify that user can login with standard_user ', async ({ page }) => {

        await home.doLogin("standard_user", "secret_sauce");
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/.*inventory/, { timeout: 5000 });
        await products.openMenu();
        await page.waitForTimeout(3000);
        await products.resetAppState();
        await page.waitForTimeout(3000);
    });

    test('Verify that user can see title of this site', async ({ page }) => {
        await expect(page).toHaveTitle(/Swag/);
    });

});



