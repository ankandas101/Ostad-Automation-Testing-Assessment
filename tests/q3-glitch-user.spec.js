import { test, expect } from '@playwright/test';
import HomePage from '../pageObjects/HomePage.js';
import ProductsPage from '../pageObjects/ProductsPage.js';
import CartPage from '../pageObjects/CartPage.js';
import CheckoutPage from '../pageObjects/CheckoutPage.js';
import DeveleryAddress from '../pageObjects/DeveleryAddress.js';
import CompleteOrderPage from '../pageObjects/CompleteOrderPage.js';

import { testProducts, deliveryInfo } from '../fixtures/testData.js';
import { users } from '../fixtures/users.js';

test.use({
    launchOptions: { slowMo: 900 } // THIS use to slow down the every step of execution speed .
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
        test.setTimeout(90000);
        const expectedPrices = [];
        await home.doLogin(users.glitchUser.username, users.glitchUser.password);
        await expect(page).toHaveURL(/.*inventory/, { timeout: 5000 });
        await products.openMenu();
        await products.resetAppState();
        await products.closeMenu();

        // Sort By Name Z to A and first product to cart
        await products.sortProductsBy('za');

        // Ensure sorting completed before continuing
        await expect(page.locator('.inventory_item_name').first())
            .toHaveText('Test.allTheThings() T-Shirt (Red)', { timeout: 15000 });


        const firstProductName = await products.addFirstProductToCart();

        const price = await products.getProductPrice(firstProductName);
        expectedPrices.push(price);

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


        //Verify that Cart lis has same price as expected test products
        const cartPrices = await cart.getProductPrices();
        expect(cartPrices).toEqual(expectedPrices);


        await cart.goToCheckout();

        // fillup develery Address form in step 1 checkout page 
        await develeryAddress.goToFinalCheckout(deliveryInfo.firstName, deliveryInfo.lastName, deliveryInfo.postalCode);

        // Q3- verify that checkout Item name as same as Test product name
        const checkoutItems = await checkout.getProductNames();
        expect(checkoutItems).toContain(firstProductName);

        //Verify that checkout Items has only one item
        await expect(checkoutItems).toHaveLength(1);


        //verify that every product price in checkout is same as test product price

        const checkoutPrices = await checkout.getProductPrices();
        expect(checkoutPrices).toEqual(expectedPrices);

        //Q3- Verify that total price to sum of all test product prices

        const allProductsPrice = await checkout.totalIteamsPrice();
        const totalExpectedPrice = Number(expectedPrices.reduce((a, b) => a + b, 0).toFixed(2)); // Expected total price of all products

        expect(allProductsPrice).toBe(totalExpectedPrice);

        //Q3- verify final Price product price + tax
        const finalPrice = await checkout.totalPrice();
        const expectedFinalPrice = Number((totalExpectedPrice + (await checkout.taxPrice())).toFixed(2)); // Expected final price with tax
        expect(finalPrice).toBe(expectedFinalPrice);

        // proceed to final checkout page
        await checkout.finishCheckout();


        //verify message Heading and Text after final checkout
        const finalMessage = await complete.getFinalCheckoutMessage();
        expect(finalMessage).toContain('Your order has been dispatched,');
        await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');


        // going back to home page
        await complete.goToHome();
        await expect(page).toHaveURL(/.*inventory/, { timeout: 3000 });

        await products.openMenu();
        await products.resetAppState();
        await products.doLogout();
        await expect(page).toHaveURL(/.*saucedemo/, { timeout: 3000 });

    });


});



