# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q2-standard-user.spec.js >> Q2 - Standard User Purchase Flow >> Verify that the user can complete checkout successfully after resetting the app state and adding three products
- Location: tests/q2-standard-user.spec.js:25:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 60.45
Received: NaN
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
  35  |         // testProducts from fixtures/testData.js
  36  |         // get product price and add to cart 
  37  |         for (const product of testProducts) {
  38  |             const price = await products.getProductPrice(product);
  39  |             expectedPrices.push(price);
  40  |             await products.addProductToCart(product);
  41  |         }
  42  | 
  43  |         console.log('Total Expected Prices Test page:', expectedPrices);
  44  | 
  45  | 
  46  |         // let testProducts = await products.addToCartRandomly(3); // if need you can add ramdom product to cart use this function instade of fixtures/testData.js
  47  | 
  48  |         // Verify that user can see correct number of products in Cart Icon
  49  |         const numOfCart = await products.getnumberOfProductsOfCart();
  50  |         await expect(numOfCart).toContain(testProducts.length.toString());
  51  | 
  52  |         await products.viewCart();
  53  |         const cartItems = await cart.getProductNames();
  54  | 
  55  |         // verify that Cart Items name as same as Test Products name
  56  |         expect(cartItems).toEqual(testProducts);
  57  | 
  58  |         //Verify that Cart list has equal number of test item
  59  |         await expect(cartItems).toHaveLength(testProducts.length);
  60  | 
  61  |         //Verify that Cart list has same price as ecpected price of test products
  62  |         const cartPrices = await cart.getProductPrices();
  63  |         expect(cartPrices).toEqual(expectedPrices);
  64  | 
  65  |         await cart.goToCheckout();
  66  | 
  67  |         // fillup develery Address form in step 1 checkout page 
  68  |         await develeryAddress.goToFinalCheckout(deliveryInfo.firstName, deliveryInfo.lastName, deliveryInfo.postalCode);
  69  |         await page.waitForTimeout(500);
  70  | 
  71  |         // verify that checkout Items name as same as Test products name
  72  |         const checkoutItems = await checkout.getProductNames();
  73  |         expect(checkoutItems).toEqual(testProducts);
  74  | 
  75  |         //Verify that checkout Items list has equal number of test item
  76  |         await expect(checkoutItems).toHaveLength(testProducts.length);
  77  | 
  78  |         //verify that every product price in checkout is same as test product price
  79  | 
  80  |         const checkoutPrices = await checkout.getProductPrices();
  81  |         expect(checkoutPrices).toEqual(expectedPrices);
  82  | 
  83  | 
  84  |         //Q2- Verify that total price to sum of all test product prices
  85  | 
  86  |         const allProductsPrice = await checkout.totalIteamsPrice();
  87  |         const totalExpectedPrice = Number(expectedPrices.reduce((a, b) => a + b, 0).toFixed(2)); // Expected total price of all products
  88  |         
  89  |         expect(allProductsPrice).toBe(totalExpectedPrice);
  90  | 
  91  |         console.log('test Products Expected price:',totalExpectedPrice)
  92  |         console.log('All Products Price in Checkout:', allProductsPrice);
  93  | 
  94  | 
  95  |         //Q2- verify final Price product price + tax
  96  |         const finalPrice = await checkout.totalPrice();
  97  |         const expectedFinalPrice = Number((totalExpectedPrice + (await checkout.taxPrice())).toFixed(2)); // Expected final price with tax
> 98  |         expect(finalPrice).toBe(expectedFinalPrice);
      |                            ^ Error: expect(received).toBe(expected) // Object.is equality
  99  | 
  100 | 
  101 |         // Go to final page
  102 |         await checkout.finishCheckout();
  103 | 
  104 |         //verify message after final checkout
  105 |         const finalMessage = await complete.getFinalCheckoutMessage();
  106 |         expect(finalMessage).toContain('Your order has been dispatched,');
  107 |         await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');
  108 | 
  109 |         // going back to home page
  110 |         await complete.goToHome();
  111 |         await expect(page).toHaveURL(/.*inventory/, { timeout: 2000 });
  112 | 
  113 |         await products.openMenu();
  114 |         await products.resetAppState();
  115 |         await products.doLogout();
  116 |         await expect(page).toHaveURL(/.*saucedemo/, { timeout: 2000 });
  117 | 
  118 |     });
  119 | 
  120 | 
  121 | });
  122 | 
  123 | 
  124 | 
  125 | 
```