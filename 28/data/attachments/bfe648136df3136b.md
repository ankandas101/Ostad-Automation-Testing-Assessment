# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q3-glitch-user.spec.js >> Q3 - Performance Glitch User Purchase Flow >> User should purchase the first product after sorting Z to A and complete checkout successfully
- Location: tests/q3-glitch-user.spec.js:28:9

# Error details

```
ReferenceError: product is not defined
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
      - generic [ref=e14]:
        - generic [ref=e15]: Products
        - generic [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: Name (Z to A)
          - combobox [ref=e19]:
            - option "Name (A to Z)"
            - option "Name (Z to A)" [selected]
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e23]:
      - generic [ref=e24]:
        - link [ref=e26] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e30] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e32]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e33]:
            - generic [ref=e34]: $15.99
            - button "Add to cart" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link [ref=e38] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]:
            - link "Sauce Labs Onesie" [ref=e42] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e44]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e45]:
            - generic [ref=e46]: $7.99
            - button "Add to cart" [ref=e47] [cursor=pointer]
      - generic [ref=e48]:
        - link [ref=e50] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - link "Sauce Labs Fleece Jacket" [ref=e54] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e56]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e57]:
            - generic [ref=e58]: $49.99
            - button "Add to cart" [ref=e59] [cursor=pointer]
      - generic [ref=e60]:
        - link [ref=e62] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e63]
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e66] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e68]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e69]:
            - generic [ref=e70]: $15.99
            - button "Add to cart" [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - link [ref=e74] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link "Sauce Labs Bike Light" [ref=e78] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e80]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e81]:
            - generic [ref=e82]: $9.99
            - button "Add to cart" [ref=e83] [cursor=pointer]
      - generic [ref=e84]:
        - link [ref=e86] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - link "Sauce Labs Backpack" [ref=e90] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e92]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e93]:
            - generic [ref=e94]: $29.99
            - button "Add to cart" [ref=e95] [cursor=pointer]
  - contentinfo [ref=e96]:
    - list [ref=e97]:
      - listitem [ref=e98]:
        - link "Twitter" [ref=e99] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e100]:
        - link "Facebook" [ref=e101] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e102]:
        - link "LinkedIn" [ref=e103] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e104]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | import { test, describe, expect } from '@playwright/test';
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
  19  |         await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
  20  |         home = new HomePage(page);
  21  |         products = new ProductsPage(page);
  22  |         cart = new CartPage(page);
  23  |         checkout = new CheckoutPage(page);
  24  |         develeryAddress = new DeveleryAddress(page);
  25  |         complete = new CompleteOrderPage(page);
  26  |     });
  27  | 
  28  |     test('User should purchase the first product after sorting Z to A and complete checkout successfully', async ({ page }) => {
  29  |         test.setTimeout(60000);
  30  |         const expectedPrices = [];
  31  |         await home.doLogin(users.glitchUser.username, users.glitchUser.password);
  32  |         await expect(page).toHaveURL(/.*inventory/, { timeout: 5000 });
  33  |         await products.openMenu();
  34  |         await products.resetAppState();
  35  |         await products.closeMenu();
  36  | 
  37  |         // Sort By Name Z to A and first product to cart
  38  |         await products.sortProductsBy('za');
> 39  |         const price = await products.getProductPrice(product);
      |                                                      ^ ReferenceError: product is not defined
  40  |         expectedPrices.push(price);
  41  |         const firstProductName = await products.addFirstProductToCart();
  42  | 
  43  | 
  44  | console.log('Total Expected Prices Test page:', expectedPrices);
  45  | 
  46  | 
  47  |         //Verify that user can see correct number of products in Cart Icon
  48  |         const numOfCart = await products.getnumberOfProductsOfCart();
  49  |         await expect(numOfCart).toContain('1');
  50  | 
  51  |         // proceed to view cart page
  52  |         await products.viewCart();
  53  |         const cartItems = await cart.getProductNames();
  54  | 
  55  |         //Verify that Cart list has only one item
  56  |         await expect(cartItems).toHaveLength(1);
  57  | 
  58  |         // verify that Cart Items name as same as Test Products name
  59  |         expect(cartItems).toContain(firstProductName);
  60  | 
  61  | 
  62  |         //Verify that Cart list has same price as ecpected price of test products
  63  |         const cartPrices = await cart.getProductPrices();
  64  |         expect(cartPrices).toEqual(expectedPrices);
  65  | 
  66  | 
  67  |         await cart.goToCheckout();
  68  | 
  69  |         // fillup develery Address form in step 1 checkout page 
  70  |         await develeryAddress.goToFinalCheckout(deliveryInfo.firstName, deliveryInfo.lastName, deliveryInfo.postalCode);
  71  | 
  72  |         // verify that checkout Items name as same as Test products name
  73  |         const checkoutItems = await checkout.getProductNames();
  74  |         expect(checkoutItems).toContain(firstProductName);
  75  | 
  76  |         //Verify that checkout Items has only one item
  77  |         await expect(checkoutItems).toHaveLength(1);
  78  | 
  79  | 
  80  |         //verify that every product price in checkout is same as test product price
  81  | 
  82  |         const checkoutPrices = await checkout.getProductPrices();
  83  |         expect(checkoutPrices).toEqual(expectedPrices);
  84  | 
  85  |         //Q2- Verify that total price to sum of all test product prices
  86  | 
  87  |         const allProductsPrice = await checkout.totalIteamsPrice();
  88  |         const totalExpectedPrice = Number(expectedPrices.reduce((a, b) => a + b, 0).toFixed(2)); // Expected total price of all products
  89  | 
  90  |         expect(allProductsPrice).toBe(totalExpectedPrice);
  91  | 
  92  |         //Q2- verify final Price product price + tax
  93  |         const finalPrice = await checkout.totalPrice();
  94  |         const expectedFinalPrice = Number((totalExpectedPrice + (await checkout.taxPrice())).toFixed(2)); // Expected final price with tax
  95  |         expect(finalPrice).toBe(expectedFinalPrice);
  96  | 
  97  |         // proceed to final checkout page
  98  |         await checkout.finishCheckout();
  99  | 
  100 | 
  101 |         //verify message Heading and Text after final checkout
  102 |         const finalMessage = await complete.getFinalCheckoutMessage();
  103 |         expect(finalMessage).toContain('Your order has been dispatched,');
  104 |         await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');
  105 |         
  106 |         
  107 |         // going back to home page
  108 |         await complete.goToHome();
  109 |         await expect(page).toHaveURL(/.*inventory/, { timeout: 3000 });
  110 | 
  111 |         await products.openMenu();
  112 |         await products.resetAppState();
  113 |         await products.doLogout();
  114 |         await expect(page).toHaveURL(/.*saucedemo/, { timeout: 3000 });
  115 | 
  116 |     });
  117 | 
  118 | 
  119 | });
  120 | 
  121 | 
  122 | 
  123 | 
```