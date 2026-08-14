# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q2-standard-user.spec.js >> Q2 - Standard User Purchase Flow >> Verify that the user can complete checkout successfully after resetting the app state and adding three products
- Location: tests\q2-standard-user.spec.js:25:5

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://www.saucedemo.com/
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "domcontentloaded"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import HomePage from '../pageObjects/HomePage';
  3   | import ProductsPage from '../pageObjects/ProductsPage';
  4   | import CartPage from '../pageObjects/CartPage';
  5   | import CheckoutPage from '../pageObjects/CheckoutPage';
  6   | import DeveleryAddress from '../pageObjects/DeveleryAddress';
  7   | import CompleteOrderPage from '../pageObjects/CompleteOrderPage.js';
  8   | 
  9   | import { testProducts, deliveryInfo } from '../fixtures/testData.js';
  10  | import { users } from '../fixtures/users.js';
  11  | 
  12  | test.describe('Q2 - Standard User Purchase Flow', () => {
  13  |     let home, products, cart, checkout, develeryAddress, complete;
  14  | 
  15  |     test.beforeEach(async ({ page }) => {
> 16  |         await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
      |                    ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://www.saucedemo.com/
  17  |         home = new HomePage(page);
  18  |         products = new ProductsPage(page);
  19  |         cart = new CartPage(page);
  20  |         checkout = new CheckoutPage(page);
  21  |         develeryAddress = new DeveleryAddress(page);
  22  |         complete = new CompleteOrderPage(page);
  23  |     });
  24  | 
  25  |     test('Verify that the user can complete checkout successfully after resetting the app state and adding three products', async ({ page }) => {
  26  |         const expectedPrices = [];
  27  | 
  28  |         await home.doLogin(users.standardUser.username, users.standardUser.password);
  29  |         await expect(page).toHaveURL(/.*inventory/, { timeout: 5000 });
  30  |         await products.openMenu();
  31  |         await products.resetAppState();
  32  |         await products.closeMenu();
  33  | 
  34  |         // let testProducts = await products.addToCartRandomly(3); // if need you can add ramdom product to cart use this function instade of fixtures/testData.js
  35  | 
  36  |         // testProducts from fixtures/testData.js , get product price and add to cart items
  37  |         for (const product of testProducts) {
  38  |             const price = await products.getProductPrice(product);
  39  |             expectedPrices.push(price);
  40  |             await products.addProductToCart(product);
  41  |         }
  42  | 
  43  | 
  44  |         // Verify that user can see correct number of products in Cart Icon
  45  |         const numOfCart = await products.getnumberOfProductsOfCart();
  46  |         await expect(numOfCart).toContain(testProducts.length.toString());
  47  | 
  48  |         await products.viewCart();
  49  |         const cartItems = await cart.getProductNames();
  50  | 
  51  |         // verify that Cart Items name as same as Test Products name
  52  |         expect(cartItems).toEqual(testProducts);
  53  | 
  54  |         //Verify that Cart list has equal number of test item
  55  |         await expect(cartItems).toHaveLength(testProducts.length);
  56  | 
  57  |         //Verify that Cart list has same price as ecpected price of test products
  58  |         const cartPrices = await cart.getProductPrices();
  59  |         expect(cartPrices).toEqual(expectedPrices);
  60  | 
  61  |         await cart.goToCheckout();
  62  | 
  63  |         // fillup develery Address form in step 1 checkout page 
  64  |         await develeryAddress.goToFinalCheckout(deliveryInfo.firstName, deliveryInfo.lastName, deliveryInfo.postalCode);
  65  |         await page.waitForTimeout(500);
  66  | 
  67  |         // verify that checkout Items name as same as Test products name
  68  |         const checkoutItems = await checkout.getProductNames();
  69  |         expect(checkoutItems).toEqual(testProducts);
  70  | 
  71  |         //Verify that checkout Items list has equal number of test item
  72  |         await expect(checkoutItems).toHaveLength(testProducts.length);
  73  | 
  74  |         //verify that every product price in checkout is same as test product price
  75  | 
  76  |         const checkoutPrices = await checkout.getProductPrices();
  77  |         expect(checkoutPrices).toEqual(expectedPrices);
  78  | 
  79  |         //Q2- Verify that total price to sum of all test product prices
  80  | 
  81  |         const allProductsPrice = await checkout.totalIteamsPrice();
  82  |         const totalExpectedPrice = Number(expectedPrices.reduce((a, b) => a + b, 0).toFixed(2)); // Expected total price of all products
  83  | 
  84  |         expect(allProductsPrice).toBe(totalExpectedPrice);
  85  | 
  86  |         //Q2- verify final Price product price + tax
  87  |         const finalPrice = await checkout.totalPrice();
  88  |         const expectedFinalPrice = Number((totalExpectedPrice + (await checkout.taxPrice())).toFixed(2)); // Expected final price with tax
  89  |         expect(finalPrice).toBe(expectedFinalPrice);
  90  | 
  91  |         // Go to final page
  92  |         await checkout.finishCheckout();
  93  | 
  94  |         //verify message Heading and Text after final checkout
  95  |         const finalMessage = await complete.getFinalCheckoutMessage();
  96  |         expect(finalMessage).toContain('Your order has been dispatched,');
  97  |         await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');
  98  | 
  99  |         // going back to home page
  100 |         await complete.goToHome();
  101 |         await expect(page).toHaveURL(/.*inventory/, { timeout: 2000 });
  102 | 
  103 |         await products.openMenu();
  104 |         await products.resetAppState();
  105 |         await products.doLogout();
  106 |         await expect(page).toHaveURL(/.*saucedemo/, { timeout: 2000 });
  107 | 
  108 |     });
  109 | 
  110 | 
  111 | });
  112 | 
  113 | 
  114 | 
  115 | 
```