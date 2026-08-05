import { test, describe, expect } from '@playwright/test';
import HomePage from '../pageObjects/HomePage';
import ProductsPage from '../pageObjects/ProductsPage';
import CartPage from '../pageObjects/CartPage';
import CheckoutPage from '../pageObjects/CheckoutPage';
import DeveleryAddress from '../pageObjects/DeveleryAddress';
import CompleteOrderPage from '../pageObjects/CompleteOrderPage.js';

import { testProducts, deliveryInfo } from '../fixtures/testData.js';
test.use({
    launchOptions: { slowMo: 300 } // use to slow down the every step of execution speed .
});
test.describe('Q3 - Performance Glitch User Purchase Flow', () => {
    let home, products, cart, checkout, develeryAddress, complete;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
        home = new HomePage(page);
        products = new ProductsPage(page);
        cart = new CartPage(page);
        checkout = new CheckoutPage(page);
        develeryAddress = new DeveleryAddress(page);
        complete = new CompleteOrderPage(page);
    });

    test('User should purchase the first product after sorting Z to A and complete checkout successfully', async ({ page }) => {
        test.setTimeout(60000);

        await home.doLogin("performance_glitch_user", "secret_sauce");
        await expect(page).toHaveURL(/.*inventory/, { timeout: 5000 });
        await products.openMenu();
        await products.resetAppState();
        await products.closeMenu();

        // Sort By Name Z to A and first product to cart
        console.log('Products sorting by Name Z to A');
        await products.sortProductsBy('za');
        const firstProductName = await products.addFirstProductToCart();

        //Verify that user can see correct number of products in Cart Icon
        const numOfCart = await products.getnumberOfProductsOfCart();
        await expect(numOfCart).toContain('1');

        // proceed to view cart page
        await products.viewCart();
        const cartItems = await cart.getProductNames();

        //Verify that Cart list has only one item
        await expect(cartItems).toHaveLength(1);

        // verify that Cart Items name as same as Test Products name
        expect(cartItems).toContain(firstProductName);
        await cart.goToCheckout();

        // fillup develery Address form in step 1 checkout page 
        await develeryAddress.goToFinalCheckout(deliveryInfo.firstName, deliveryInfo.lastName, deliveryInfo.postalCode);

        // verify that checkout Items name as same as Test products name
        const checkoutItems = await checkout.getProductNames();
        expect(checkoutItems).toContain(firstProductName);

        //Verify that checkout Items has only one item
        await expect(checkoutItems).toHaveLength(1);

        // proceed to final checkout page
        await checkout.finishCheckout();


        //verify message Heading and Text after final checkout
        const finalMessage = await complete.getFinalCheckoutMessage();
        expect(finalMessage).toContain('Your order has been dispatched,');
        await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');

        await complete.goToHome();
        await expect(page).toHaveURL(/.*inventory/, { timeout: 3000 });

        await products.openMenu();
        await products.resetAppState();
        await products.doLogout();
        await expect(page).toHaveURL(/.*saucedemo/, { timeout: 3000 });

    });


});



