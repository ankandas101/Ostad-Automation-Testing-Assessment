import { test, expect } from '@playwright/test';
import HomePage from '../pageObjects/HomePage.js';
import ProductsPage from '../pageObjects/ProductsPage.js';
import CartPage from '../pageObjects/CartPage.js';
import CheckoutPage from '../pageObjects/CheckoutPage.js';
import DeveleryAddress from '../pageObjects/DeveleryAddress.js';
import CompleteOrderPage from '../pageObjects/CompleteOrderPage.js';

import { testProducts, deliveryInfo } from '../fixtures/testData.js';
import { users } from '../fixtures/users.js';

test.describe('Q2 - Standard User Purchase Flow', () => {
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

    test('Verify that the user can complete checkout successfully after resetting the app state and adding three products', async ({ page }) => {
        const expectedPrices = [];

        await home.doLogin(users.standardUser.username, users.standardUser.password);
        await expect(page).toHaveURL(/.*inventory/, { timeout: 5000 });
        await products.openMenu();
        await products.resetAppState();
        await products.closeMenu();

        // let testProducts = await products.addToCartRandomly(3); // if need you can add ramdom product to cart use this function instade of fixtures/testData.js

        // testProducts from fixtures/testData.js , get product price and add to cart items
        for (const product of testProducts) {
            const price = await products.getProductPrice(product);
            expectedPrices.push(price);
            await products.addProductToCart(product);
        }


        // Verify that user can see correct number of products in Cart Icon
        const numOfCart = await products.getnumberOfProductsOfCart();
        await expect(numOfCart).toContain(testProducts.length.toString());

        await products.viewCart();
        const cartItems = await cart.getProductNames();

        // verify that Cart Items name as same as Test Products name
        expect(cartItems).toEqual(testProducts);

        //Verify that Cart list has equal number of test item
        await expect(cartItems).toHaveLength(testProducts.length);

        //Verify that Cart list has same price as ecpected price of test products
        const cartPrices = await cart.getProductPrices();
        expect(cartPrices).toEqual(expectedPrices);

        await cart.goToCheckout();

        // fillup develery Address form in step 1 checkout page 
        await develeryAddress.goToFinalCheckout(deliveryInfo.firstName, deliveryInfo.lastName, deliveryInfo.postalCode);
        await page.waitForTimeout(500);

        // verify that checkout Items name as same as Test products name
        const checkoutItems = await checkout.getProductNames();
        expect(checkoutItems).toEqual(testProducts);

        //Verify that checkout Items list has equal number of test item
        await expect(checkoutItems).toHaveLength(testProducts.length);

        //verify that every product price in checkout is same as test product price

        const checkoutPrices = await checkout.getProductPrices();
        expect(checkoutPrices).toEqual(expectedPrices);

        //Q2- Verify that total price to sum of all test product prices

        const allProductsPrice = await checkout.totalIteamsPrice();
        const totalExpectedPrice = Number(expectedPrices.reduce((a, b) => a + b, 0).toFixed(2)); // Expected total price of all products

        expect(allProductsPrice).toBe(totalExpectedPrice);

        //Q2- verify final Price product price + tax
        const finalPrice = await checkout.totalPrice();
        const expectedFinalPrice = Number((totalExpectedPrice + (await checkout.taxPrice())).toFixed(2)); // Expected final price with tax
        expect(finalPrice).toBe(expectedFinalPrice);

        // Go to final page
        await checkout.finishCheckout();

        //verify message Heading and Text after final checkout
        const finalMessage = await complete.getFinalCheckoutMessage();
        expect(finalMessage).toContain('Your order has been dispatched,');
        await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');

        // going back to home page
        await complete.goToHome();
        await expect(page).toHaveURL(/.*inventory/, { timeout: 2000 });

        await products.openMenu();
        await products.resetAppState();
        await products.doLogout();
        await expect(page).toHaveURL(/.*saucedemo/, { timeout: 2000 });

    });


});



