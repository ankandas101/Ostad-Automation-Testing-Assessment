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

    test('Verify that the user can complete checkout successfully after resetting the app state and adding three products', async ({ page }) => {

        await home.doLogin("standard_user", "secret_sauce");
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/.*inventory/, { timeout: 5000 });
        await products.openMenu();
        await page.waitForTimeout(500);
        await products.resetAppState();
        await products.closeMenu();
       
        //await products.addProductToCart('Sauce Labs Fleece Jacket');

        await products.addToCartRandomly(3); // number of products you want to add to cart 

        const numOfCart = await products.getnumberOfProductsOfCart();
        await expect(numOfCart).toContain('3');

        await products.viewCart();

        // await products.doLogout();
        // await page.waitForTimeout(3000);
        // await expect(page).toHaveURL(/.*saucedemo/,{ timeout: 5000 });

    });


});



