import { test, describe, expect } from '@playwright/test';
import HomePage from '../pageObjects/HomePage';
import Products from '../pageObjects/Products';
import Cart from '../pageObjects/Cart';
test.describe('Q2 - Standard User Purchase Flow', () => {
    let home, products, cart;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
        home = new HomePage(page);
        products = new Products(page);
        cart = new Cart(page);
    });

    test('Verify that the user can complete checkout successfully after resetting the app state and adding three products', async ({ page }) => {

        await home.doLogin("standard_user", "secret_sauce");
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/.*inventory/, { timeout: 5000 });
        await products.openMenu();
        await products.resetAppState();
        await products.closeMenu();
        const testProducts = [
            "Sauce Labs Backpack",
            "Sauce Labs Bolt T-Shirt"
        ];

        for (const product of testProducts) {
            await products.addProductToCart(product);
        }


        //await products.addToCartRandomly(3); // number of products you want to add to cart randomly

        // Verify that user can see correct number of products in Cart Icon
        const numOfCart = await products.getnumberOfProductsOfCart();
        await expect.soft(numOfCart).toContain(testProducts.length());


        await products.viewCart();
        const cartItems = await cart.getProductName();
        // verify that cartItems name as same as test products name
        expect(cartItems).toEqual(testProducts);

        // await products.doLogout();
        // await page.waitForTimeout(3000);
        // await expect(page).toHaveURL(/.*saucedemo/,{ timeout: 5000 });

    });


});



