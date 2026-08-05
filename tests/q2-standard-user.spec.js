import { test, describe, expect } from '@playwright/test';
import HomePage from '../pageObjects/HomePage';
import Products from '../pageObjects/Products';
import Cart from '../pageObjects/Cart';
import Checkout from '../pageObjects/Checkout';
import DeveleryAddress from '../pageObjects/DeveleryAddress';
import Complete from '../pageObjects/Complete';


test.describe('Q2 - Standard User Purchase Flow', () => {
    let home, products, cart, checkout, develeryAddress, complete;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
        home = new HomePage(page);
        products = new Products(page);
        cart = new Cart(page);
        checkout = new Checkout(page);
        develeryAddress = new DeveleryAddress(page);
        complete = new Complete(page);
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
            "Sauce Labs Bike Light",
            "Sauce Labs Bolt T-Shirt"
        ];

        for (const product of testProducts) {
            await products.addProductToCart(product);
        }


        //await products.addToCartRandomly(3); // number of products you want to add to cart randomly

        // Verify that user can see correct number of products in Cart Icon
        const numOfCart = await products.getnumberOfProductsOfCart();
        await expect(numOfCart).toContain('3');


        await products.viewCart();
        const cartItems = await cart.getProductNames();

        // verify that cartItems name as same as test products name
        expect(cartItems).toEqual(testProducts);
        await cart.goToCheckout();

        // fillup develery Address form in step 1 checkout page
        await develeryAddress.goToFinalCheckout('aaaa','ddas','1900');
        await page.waitForTimeout(1500);


        // verify that checkout Items name as same as test products name
        const checkoutItems = await checkout.getProductNames();
        expect(checkoutItems).toEqual(testProducts);
        

        await checkout.finishCheckout();
        await page.waitForTimeout(3000);

        //verify message after final checkout
        const finalMessage = await complete.getFinalCheckoutMessage();
        expect(finalMessage).toContain('Your order has been dispatched,');
        await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');

        await complete.goToHome();
        await page.waitForTimeout(3000);
        await expect(page).toHaveURL(/.*inventory/,{ timeout: 3000 });

        await products.openMenu();
        await products.resetAppState();
        await products.doLogout();

        await page.waitForTimeout(3000);
        await expect(page).toHaveURL(/.*saucedemo/,{ timeout: 5000 });

    });


});



