# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q2-standard-user.spec.js >> Q2 - Standard User Purchase Flow >> Verify that the user can complete checkout successfully after resetting the app state and adding three products
- Location: tests/q2-standard-user.spec.js:25:9

# Error details

```
ReferenceError: inventory is not defined
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
        - generic [ref=e12]: "3"
      - generic [ref=e15]: Your Cart
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Sauce Labs Backpack" [ref=e25] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e28]:
              - generic [ref=e29]: $29.99
              - button "Remove" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - generic [ref=e32]: "1"
          - generic [ref=e33]:
            - link "Sauce Labs Bike Light" [ref=e34] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e36]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
            - generic [ref=e37]:
              - generic [ref=e38]: $9.99
              - button "Remove" [ref=e39] [cursor=pointer]
        - generic [ref=e40]:
          - generic [ref=e41]: "1"
          - generic [ref=e42]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e43] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e45]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
            - generic [ref=e46]:
              - generic [ref=e47]: $15.99
              - button "Remove" [ref=e48] [cursor=pointer]
      - generic [ref=e49]:
        - button [ref=e50] [cursor=pointer]:
          - img "Go back" [ref=e51]
          - text: Continue Shopping
        - button "Checkout" [ref=e52] [cursor=pointer]
  - contentinfo [ref=e53]:
    - list [ref=e54]:
      - listitem [ref=e55]:
        - link "Twitter" [ref=e56] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e57]:
        - link "Facebook" [ref=e58] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e59]:
        - link "LinkedIn" [ref=e60] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e61]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
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
  35  |         // testProducts from fixtures/testData.js
  36  |         for (const product of testProducts) {
  37  |             await products.addProductToCart(product);
  38  |         }
  39  | 
  40  |         // let testProducts = await products.addToCartRandomly(3); // if need you can add ramdom product to cart use this function instade of fixtures/testData.js
  41  | 
  42  |         // Verify that user can see correct number of products in Cart Icon
  43  |         const numOfCart = await products.getnumberOfProductsOfCart();
  44  |         await expect(numOfCart).toContain(testProducts.length.toString());
  45  | 
  46  |         await products.viewCart();
  47  |         const cartItems = await cart.getProductNames();
  48  | 
  49  |         // verify that Cart Items name as same as Test Products name
  50  |         expect(cartItems).toEqual(testProducts);
  51  | 
  52  |         //Verify that Cart list has equal number of test item
  53  |         await expect(cartItems).toHaveLength(testProducts.length);
  54  | 
  55  | 
  56  |         // verify that product price in cart is same as product price in product page
  57  | for (const product of testProducts) {
> 58  |     const price = await inventory.getProductPrice(product);
      |                   ^ ReferenceError: inventory is not defined
  59  |     expectedPrices.push(price);
  60  |     await inventory.addProductToCart(product);
  61  | }
  62  | 
  63  | 
  64  |         await cart.goToCheckout();
  65  | 
  66  |         // fillup develery Address form in step 1 checkout page 
  67  |         await develeryAddress.goToFinalCheckout(deliveryInfo.firstName, deliveryInfo.lastName, deliveryInfo.postalCode);
  68  |         await page.waitForTimeout(1000);
  69  | 
  70  | 
  71  |         // verify that checkout Items name as same as Test products name
  72  |         const checkoutItems = await checkout.getProductNames();
  73  |         expect(checkoutItems).toEqual(testProducts);
  74  | 
  75  |         //Verify that checkout Items list has equal number of test item
  76  |         await expect(checkoutItems).toHaveLength(testProducts.length);
  77  | 
  78  |         await checkout.finishCheckout();
  79  | 
  80  |         //verify message after final checkout
  81  |         const finalMessage = await complete.getFinalCheckoutMessage();
  82  |         expect(finalMessage).toContain('Your order has been dispatched,');
  83  |         await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');
  84  | 
  85  |         // going back to home page
  86  |         await complete.goToHome();
  87  |         await expect(page).toHaveURL(/.*inventory/, { timeout: 2000 });
  88  | 
  89  |         await products.openMenu();
  90  |         await products.resetAppState();
  91  |         await products.doLogout();
  92  |         await expect(page).toHaveURL(/.*saucedemo/, { timeout: 2000 });
  93  | 
  94  |     });
  95  | 
  96  | 
  97  | });
  98  | 
  99  | 
  100 | 
  101 | 
```