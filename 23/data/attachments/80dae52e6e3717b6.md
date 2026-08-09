# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q2-standard-user.spec.js >> Q2 - Standard User Purchase Flow >> Verify that the user can complete checkout successfully after resetting the app state and adding three products
- Location: tests/q2-standard-user.spec.js:25:9

# Error details

```
Error: "testProducts" is read-only.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic:
          - generic:
            - generic [ref=e7]:
              - button "Open Menu" [ref=e8] [cursor=pointer]
              - img "Open Menu" [ref=e9]
            - generic [ref=e10]:
              - navigation [ref=e12]:
                - link [ref=e13] [cursor=pointer]:
                  - /url: "#"
                  - text: All Items
                - link [ref=e14] [cursor=pointer]:
                  - /url: https://saucelabs.com/
                  - text: About
                - link [ref=e15] [cursor=pointer]:
                  - /url: "#"
                  - text: Logout
                - link [ref=e16] [cursor=pointer]:
                  - /url: "#"
                  - text: Reset App State
              - button [ref=e18] [cursor=pointer]: Close Menu
        - generic [ref=e20]: Swag Labs
        - generic [ref=e22]: "3"
      - generic [ref=e25]:
        - generic [ref=e26]: Products
        - generic [ref=e28] [cursor=pointer]:
          - generic [ref=e29]: Name (A to Z)
          - combobox [ref=e30]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e34]:
      - generic [ref=e35]:
        - link [ref=e37] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e38]
        - generic [ref=e39]:
          - generic [ref=e40]:
            - link "Sauce Labs Backpack" [ref=e41] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e43]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e44]:
            - generic [ref=e45]: $29.99
            - button "Remove" [ref=e46] [cursor=pointer]
      - generic [ref=e47]:
        - link [ref=e49] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e50]
        - generic [ref=e51]:
          - generic [ref=e52]:
            - link "Sauce Labs Bike Light" [ref=e53] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e55]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e56]:
            - generic [ref=e57]: $9.99
            - button "Add to cart" [ref=e58] [cursor=pointer]
      - generic [ref=e59]:
        - link [ref=e61] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e62]
        - generic [ref=e63]:
          - generic [ref=e64]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e65] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e67]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e68]:
            - generic [ref=e69]: $15.99
            - button "Remove" [ref=e70] [cursor=pointer]
      - generic [ref=e71]:
        - link [ref=e73] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e74]
        - generic [ref=e75]:
          - generic [ref=e76]:
            - link "Sauce Labs Fleece Jacket" [ref=e77] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e79]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e80]:
            - generic [ref=e81]: $49.99
            - button "Add to cart" [ref=e82] [cursor=pointer]
      - generic [ref=e83]:
        - link [ref=e85] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e86]
        - generic [ref=e87]:
          - generic [ref=e88]:
            - link "Sauce Labs Onesie" [ref=e89] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e91]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e92]:
            - generic [ref=e93]: $7.99
            - button "Remove" [ref=e94] [cursor=pointer]
      - generic [ref=e95]:
        - link [ref=e97] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e98]
        - generic [ref=e99]:
          - generic [ref=e100]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e101] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e103]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e104]:
            - generic [ref=e105]: $15.99
            - button "Add to cart" [ref=e106] [cursor=pointer]
  - contentinfo [ref=e107]:
    - list [ref=e108]:
      - listitem [ref=e109]:
        - link "Twitter" [ref=e110] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e111]:
        - link "Facebook" [ref=e112] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e113]:
        - link "LinkedIn" [ref=e114] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e115]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
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
> 40  |         testProducts = await products.addToCartRandomly(3); 
      |                                                           ^ Error: "testProducts" is read-only.
  41  | 
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
  53  |         await expect(numOfCart).toContain(testProducts.length.toString());
  54  | 
  55  |         await products.viewCart();
  56  |         const cartItems = await cart.getProductNames();
  57  | 
  58  |         // verify that Cart Items name as same as Test Products name
  59  |         expect(cartItems).toEqual(testProducts);
  60  | 
  61  |         //Verify that Cart list has equal number of test item
  62  |         await expect(cartItems).toHaveLength(testProducts.length);
  63  | 
  64  |         //Verify that Cart list has same price as ecpected price of test products
  65  |         const cartPrices = await cart.getProductPrices();
  66  |         expect(cartPrices).toEqual(expectedPrices);
  67  | 
  68  |         await cart.goToCheckout();
  69  | 
  70  |         // fillup develery Address form in step 1 checkout page 
  71  |         await develeryAddress.goToFinalCheckout(deliveryInfo.firstName, deliveryInfo.lastName, deliveryInfo.postalCode);
  72  |         await page.waitForTimeout(500);
  73  | 
  74  |         // verify that checkout Items name as same as Test products name
  75  |         const checkoutItems = await checkout.getProductNames();
  76  |         expect(checkoutItems).toEqual(testProducts);
  77  | 
  78  |         //Verify that checkout Items list has equal number of test item
  79  |         await expect(checkoutItems).toHaveLength(testProducts.length);
  80  | 
  81  |         //verify that every product price in checkout is same as test product price
  82  | 
  83  |         const checkoutPrices = await checkout.getProductPrices();
  84  |         expect(checkoutPrices).toEqual(expectedPrices);
  85  | 
  86  |         //Q2- Verify that total price to sum of all test product prices
  87  | 
  88  |         const allProductsPrice = await checkout.totalIteamsPrice();
  89  |         const totalExpectedPrice = Number(expectedPrices.reduce((a, b) => a + b, 0).toFixed(2)); // Expected total price of all products
  90  | 
  91  |         expect(allProductsPrice).toBe(totalExpectedPrice);
  92  | 
  93  |         //Q2- verify final Price product price + tax
  94  |         const finalPrice = await checkout.totalPrice();
  95  |         const expectedFinalPrice = Number((totalExpectedPrice + (await checkout.taxPrice())).toFixed(2)); // Expected final price with tax
  96  |         expect(finalPrice).toBe(expectedFinalPrice);
  97  | 
  98  |         // Go to final page
  99  |         await checkout.finishCheckout();
  100 | 
  101 |         //verify message Heading and Text after final checkout
  102 |         const finalMessage = await complete.getFinalCheckoutMessage();
  103 |         expect(finalMessage).toContain('Your order has been dispatched,');
  104 |         await expect(complete.headerLocator(2)).toContainText('Thank you for your order!');
  105 | 
  106 |         // going back to home page
  107 |         await complete.goToHome();
  108 |         await expect(page).toHaveURL(/.*inventory/, { timeout: 2000 });
  109 | 
  110 |         await products.openMenu();
  111 |         await products.resetAppState();
  112 |         await products.doLogout();
  113 |         await expect(page).toHaveURL(/.*saucedemo/, { timeout: 2000 });
  114 | 
  115 |     });
  116 | 
  117 | 
  118 | });
  119 | 
  120 | 
  121 | 
  122 | 
```