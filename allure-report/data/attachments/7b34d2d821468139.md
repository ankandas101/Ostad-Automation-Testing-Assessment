# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q3-glitch-user.spec.js >> Q3 - Performance Glitch User Purchase Flow >> User should purchase the first product after sorting Z to A and complete checkout successfully
- Location: tests\q3-glitch-user.spec.js:28:5

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://www.saucedemo.com/
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "domcontentloaded"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import HomePage from '../pageObjects/HomePage.js';
  3   | import ProductsPage from '../pageObjects/ProductsPage.js';
  4   | import CartPage from '../pageObjects/CartPage.js';
  5   | import CheckoutPage from '../pageObjects/CheckoutPage.js';
  6   | import DeveleryAddress from '../pageObjects/DeveleryAddress.js';
  7   | import CompleteOrderPage from '../pageObjects/CompleteOrderPage.js';
  8   | 
  9   | import { testProducts, deliveryInfo } from '../fixtures/testData.js';
  10  | import { users } from '../fixtures/users.js';
  11  | 
  12  | test.use({
  13  |     launchOptions: { slowMo: 300 } // use to slow down the every step of execution speed .
  14  | });
  15  | test.describe('Q3 - Performance Glitch User Purchase Flow', () => {
  16  |     let home, products, cart, checkout, develeryAddress, complete;
  17  | 
  18  |     test.beforeEach(async ({ page }) => {
> 19  |         await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
      |                    ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://www.saucedemo.com/
  20  |         home = new HomePage(page);
  21  |         products = new ProductsPage(page);
  22  |         cart = new CartPage(page);
  23  |         checkout = new CheckoutPage(page);
  24  |         develeryAddress = new DeveleryAddress(page);
  25  |         complete = new CompleteOrderPage(page);
  26  |     });
  27  | 
  28  |     test('User should purchase the first product after sorting Z to A and complete checkout successfully', async ({ page }) => {
  29  |         test.setTimeout(90000);
  30  |         const expectedPrices = [];
  31  |         await home.doLogin(users.glitchUser.username, users.glitchUser.password);
  32  |         await expect(page).toHaveURL(/.*inventory/, { timeout: 5000 });
  33  |         await products.openMenu();
  34  |         await products.resetAppState();
  35  |         await products.closeMenu();
  36  | 
  37  |         // Sort By Name Z to A and first product to cart
  38  |         await products.sortProductsBy('za');
  39  | 
  40  |         // Ensure sorting completed before continuing
  41  |         await expect(page.locator('.inventory_item_name').first())
  42  |             .toHaveText('Test.allTheThings() T-Shirt (Red)', { timeout: 15000 });
  43  | 
  44  | 
  45  |         const firstProductName = await products.addFirstProductToCart();
  46  | 
  47  |         const price = await products.getProductPrice(firstProductName);
  48  |         expectedPrices.push(price);
  49  | 
  50  |         //Verify that user can see correct number of products in Cart Icon
  51  |         const numOfCart = await products.getnumberOfProductsOfCart();
  52  |         await expect(numOfCart).toContain('1');
  53  | 
  54  |         // proceed to view cart page
  55  |         await products.viewCart();
  56  |         const cartItems = await cart.getProductNames();
  57  | 
  58  |         //Verify that Cart list has only one item
  59  |         await expect(cartItems).toHaveLength(1);
  60  | 
  61  |         // verify that Cart Items name as same as Test Products name
  62  |         expect(cartItems).toContain(firstProductName);
  63  | 
  64  | 
  65  |         //Verify that Cart lis has same price as expected test products
  66  |         const cartPrices = await cart.getProductPrices();
  67  |         expect(cartPrices).toEqual(expectedPrices);
  68  | 
  69  | 
  70  |         await cart.goToCheckout();
  71  | 
  72  |         // fillup develery Address form in step 1 checkout page 
  73  |         await develeryAddress.goToFinalCheckout(deliveryInfo.firstName, deliveryInfo.lastName, deliveryInfo.postalCode);
  74  | 
  75  |         // Q3- verify that checkout Item name as same as Test product name
  76  |         const checkoutItems = await checkout.getProductNames();
  77  |         expect(checkoutItems).toContain(firstProductName);
  78  | 
  79  |         //Verify that checkout Items has only one item
  80  |         await expect(checkoutItems).toHaveLength(1);
  81  | 
  82  | 
  83  |         //verify that every product price in checkout is same as test product price
  84  | 
  85  |         const checkoutPrices = await checkout.getProductPrices();
  86  |         expect(checkoutPrices).toEqual(expectedPrices);
  87  | 
  88  |         //Q3- Verify that total price to sum of all test product prices
  89  | 
  90  |         const allProductsPrice = await checkout.totalIteamsPrice();
  91  |         const totalExpectedPrice = Number(expectedPrices.reduce((a, b) => a + b, 0).toFixed(2)); // Expected total price of all products
  92  | 
  93  |         expect(allProductsPrice).toBe(totalExpectedPrice);
  94  | 
  95  |         //Q3- verify final Price product price + tax
  96  |         const finalPrice = await checkout.totalPrice();
  97  |         const expectedFinalPrice = Number((totalExpectedPrice + (await checkout.taxPrice())).toFixed(2)); // Expected final price with tax
  98  |         expect(finalPrice).toBe(expectedFinalPrice);
  99  | 
  100 |         // proceed to final checkout page
  101 |         await checkout.finishCheckout();
  102 | 
  103 | 
  104 |         //verify message Heading and Text after final checkout
  105 |         const finalMessage = await complete.getFinalCheckoutMessage();
  106 |         expect(finalMessage).toContain('Your order has been dispatched,');
  107 |         await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');
  108 | 
  109 | 
  110 |         // going back to home page
  111 |         await complete.goToHome();
  112 |         await expect(page).toHaveURL(/.*inventory/, { timeout: 3000 });
  113 | 
  114 |         await products.openMenu();
  115 |         await products.resetAppState();
  116 |         await products.doLogout();
  117 |         await expect(page).toHaveURL(/.*saucedemo/, { timeout: 3000 });
  118 | 
  119 |     });
```