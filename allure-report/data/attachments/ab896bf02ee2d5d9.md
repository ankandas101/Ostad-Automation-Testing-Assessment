# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q2-standard-user.spec.js >> Q2 - Standard User Purchase Flow >> Verify that the user can complete checkout successfully after resetting the app state and adding three products
- Location: tests/q2-standard-user.spec.js:25:9

# Error details

```
TypeError: checkout.getProductPrices is not a function
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
      - generic [ref=e15]: "Checkout: Overview"
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
            - generic [ref=e28]: $29.99
        - generic [ref=e30]:
          - generic [ref=e31]: "1"
          - generic [ref=e32]:
            - link "Sauce Labs Bike Light" [ref=e33] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e35]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
            - generic [ref=e36]: $9.99
        - generic [ref=e38]:
          - generic [ref=e39]: "1"
          - generic [ref=e40]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e41] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e43]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
            - generic [ref=e44]: $15.99
      - generic [ref=e46]:
        - generic [ref=e47]: "Payment Information:"
        - generic [ref=e48]: "SauceCard #31337"
        - generic [ref=e49]: "Shipping Information:"
        - generic [ref=e50]: Free Pony Express Delivery!
        - generic [ref=e51]: Price Total
        - generic [ref=e52]: "Item total: $55.97"
        - generic [ref=e53]: "Tax: $4.48"
        - generic [ref=e54]: "Total: $60.45"
        - generic [ref=e55]:
          - button [ref=e56] [cursor=pointer]:
            - img "Go back" [ref=e57]
            - text: Cancel
          - button "Finish" [ref=e58] [cursor=pointer]
  - contentinfo [ref=e59]:
    - list [ref=e60]:
      - listitem [ref=e61]:
        - link "Twitter" [ref=e62] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e63]:
        - link "Facebook" [ref=e64] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e65]:
        - link "LinkedIn" [ref=e66] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e67]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
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
  35  |         // // testProducts from fixtures/testData.js
  36  |         // for (const product of testProducts) {
  37  |         //     await products.addProductToCart(product);
  38  |         // }
  39  | 
  40  | 
  41  | 
  42  |         // verify that product price in cart is same as product price in product page
  43  |         for (const product of testProducts) {
  44  |             const price = await products.getProductPrice(product);
  45  |             expectedPrices.push(price);
  46  |             await products.addProductToCart(product);
  47  |         }
  48  | 
  49  | 
  50  | 
  51  |         // let testProducts = await products.addToCartRandomly(3); // if need you can add ramdom product to cart use this function instade of fixtures/testData.js
  52  | 
  53  |         // Verify that user can see correct number of products in Cart Icon
  54  |         const numOfCart = await products.getnumberOfProductsOfCart();
  55  |         await expect(numOfCart).toContain(testProducts.length.toString());
  56  | 
  57  |         await products.viewCart();
  58  |         const cartItems = await cart.getProductNames();
  59  | 
  60  |         // verify that Cart Items name as same as Test Products name
  61  |         expect(cartItems).toEqual(testProducts);
  62  | 
  63  |         //Verify that Cart list has equal number of test item
  64  |         await expect(cartItems).toHaveLength(testProducts.length);
  65  | 
  66  | 
  67  | 
  68  | 
  69  |         await cart.goToCheckout();
  70  | 
  71  |         // fillup develery Address form in step 1 checkout page 
  72  |         await develeryAddress.goToFinalCheckout(deliveryInfo.firstName, deliveryInfo.lastName, deliveryInfo.postalCode);
  73  |         await page.waitForTimeout(1000);
  74  | 
  75  | 
  76  |         // verify that checkout Items name as same as Test products name
  77  |         const checkoutItems = await checkout.getProductNames();
  78  |         expect(checkoutItems).toEqual(testProducts);
  79  | 
  80  |         //Verify that checkout Items list has equal number of test item
  81  |         await expect(checkoutItems).toHaveLength(testProducts.length);
  82  | 
  83  | 
  84  |         // verify that product price in checkout is same as product price in product page
> 85  |         const checkoutPrices = await checkout.getProductPrices();
      |                                               ^ TypeError: checkout.getProductPrices is not a function
  86  |         expect(checkoutPrices).toEqual(expectedPrices);
  87  | 
  88  | 
  89  | 
  90  |         await checkout.finishCheckout();
  91  | 
  92  |         //verify message after final checkout
  93  |         const finalMessage = await complete.getFinalCheckoutMessage();
  94  |         expect(finalMessage).toContain('Your order has been dispatched,');
  95  |         await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');
  96  | 
  97  |         // going back to home page
  98  |         await complete.goToHome();
  99  |         await expect(page).toHaveURL(/.*inventory/, { timeout: 2000 });
  100 | 
  101 |         await products.openMenu();
  102 |         await products.resetAppState();
  103 |         await products.doLogout();
  104 |         await expect(page).toHaveURL(/.*saucedemo/, { timeout: 2000 });
  105 | 
  106 |     });
  107 | 
  108 | 
  109 | });
  110 | 
  111 | 
  112 | 
  113 | 
```