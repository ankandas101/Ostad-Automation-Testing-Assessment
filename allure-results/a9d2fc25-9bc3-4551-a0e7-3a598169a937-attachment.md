# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q2-standard-user.spec.js >> Q2 - Standard User Purchase Flow >> Verify that the user can complete checkout successfully after resetting the app state and adding three products
- Location: tests/q2-standard-user.spec.js:25:9

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 5
+ Received  + 1

- Array [
-   "Sauce Labs Backpack",
-   "Sauce Labs Bolt T-Shirt",
-   "Sauce Labs Onesie",
- ]
+ Array []
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e10]: Swag Labs
      - generic [ref=e14]: Your Cart
    - generic [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]: QTY
        - generic [ref=e20]: Description
      - generic [ref=e21]:
        - button [ref=e22] [cursor=pointer]:
          - img "Go back" [ref=e23]
          - text: Continue Shopping
        - button "Checkout" [ref=e24] [cursor=pointer]
  - contentinfo [ref=e25]:
    - list [ref=e26]:
      - listitem [ref=e27]:
        - link "Twitter" [ref=e28] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e29]:
        - link "Facebook" [ref=e30] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e31]:
        - link "LinkedIn" [ref=e32] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e33]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | import { test, describe, expect } from '@playwright/test';
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
  16  |         await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
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
  34  | 
  35  | 
  36  | 
  37  | 
  38  |         
  39  |         //if need you want to add ramdom product to cart use this function instade of testData.js
  40  |         let testProducts = await products.addToCartRandomly(3); 
  41  |         console.log(testProducts.length);
  42  | 
  43  |         // testProducts from fixtures/testData.js , get product price and add to cart items
  44  |         for (const product of testProducts) {
  45  |             const price = await products.getProductPrice(product);
  46  |             expectedPrices.push(price);
  47  |             await products.addProductToCart(product);
  48  |         }
  49  | 
  50  | 
  51  |         // Verify that user can see correct number of products in Cart Icon
  52  |         const numOfCart = await products.getnumberOfProductsOfCart();
  53  |         console.log(numOfCart);
  54  | 
  55  |         //await expect(Number(numOfCart)).toContain(testProducts.length);
  56  | 
  57  |         await products.viewCart();
  58  |         const cartItems = await cart.getProductNames();
  59  | 
  60  |         // verify that Cart Items name as same as Test Products name
> 61  |         expect(cartItems).toEqual(testProducts);
      |                           ^ Error: expect(received).toEqual(expected) // deep equality
  62  | 
  63  |         //Verify that Cart list has equal number of test item
  64  |         await expect(cartItems).toHaveLength(testProducts.length);
  65  | 
  66  |         //Verify that Cart list has same price as ecpected price of test products
  67  |         const cartPrices = await cart.getProductPrices();
  68  |         expect(cartPrices).toEqual(expectedPrices);
  69  | 
  70  |         await cart.goToCheckout();
  71  | 
  72  |         // fillup develery Address form in step 1 checkout page 
  73  |         await develeryAddress.goToFinalCheckout(deliveryInfo.firstName, deliveryInfo.lastName, deliveryInfo.postalCode);
  74  |         await page.waitForTimeout(500);
  75  | 
  76  |         // verify that checkout Items name as same as Test products name
  77  |         const checkoutItems = await checkout.getProductNames();
  78  |         expect(checkoutItems).toEqual(testProducts);
  79  | 
  80  |         //Verify that checkout Items list has equal number of test item
  81  |         await expect(checkoutItems).toHaveLength(testProducts.length);
  82  | 
  83  |         //verify that every product price in checkout is same as test product price
  84  | 
  85  |         const checkoutPrices = await checkout.getProductPrices();
  86  |         expect(checkoutPrices).toEqual(expectedPrices);
  87  | 
  88  |         //Q2- Verify that total price to sum of all test product prices
  89  | 
  90  |         const allProductsPrice = await checkout.totalIteamsPrice();
  91  |         const totalExpectedPrice = Number(expectedPrices.reduce((a, b) => a + b, 0).toFixed(2)); // Expected total price of all products
  92  | 
  93  |         expect(allProductsPrice).toBe(totalExpectedPrice);
  94  | 
  95  |         //Q2- verify final Price product price + tax
  96  |         const finalPrice = await checkout.totalPrice();
  97  |         const expectedFinalPrice = Number((totalExpectedPrice + (await checkout.taxPrice())).toFixed(2)); // Expected final price with tax
  98  |         expect(finalPrice).toBe(expectedFinalPrice);
  99  | 
  100 |         // Go to final page
  101 |         await checkout.finishCheckout();
  102 | 
  103 |         //verify message Heading and Text after final checkout
  104 |         const finalMessage = await complete.getFinalCheckoutMessage();
  105 |         expect(finalMessage).toContain('Your order has been dispatched,');
  106 |         await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');
  107 | 
  108 |         // going back to home page
  109 |         await complete.goToHome();
  110 |         await expect(page).toHaveURL(/.*inventory/, { timeout: 2000 });
  111 | 
  112 |         await products.openMenu();
  113 |         await products.resetAppState();
  114 |         await products.doLogout();
  115 |         await expect(page).toHaveURL(/.*saucedemo/, { timeout: 2000 });
  116 | 
  117 |     });
  118 | 
  119 | 
  120 | });
  121 | 
  122 | 
  123 | 
  124 | 
```