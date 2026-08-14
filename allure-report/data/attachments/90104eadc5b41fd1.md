# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: q2-standard-user.spec.js >> Q2 - Standard User Purchase Flow >> Verify that the user can complete checkout successfully after resetting the app state and adding three products
- Location: tests/q2-standard-user.spec.js:25:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.inventory_item').filter({ has: getByText('Sauce Labs Backpack') }).locator('[data-test="inventory-item-price"]')

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
  1  | import BasePage from "./BasePage";
  2  | import { expect } from "@playwright/test";
  3  | 
  4  | export default class ProductsPage extends BasePage {
  5  |     constructor(page) {
  6  |         super(page);
  7  |     }
  8  | 
  9  |     async openMenu() {
  10 |         await this.buttonLocator('Open Menu').click();
  11 |     }
  12 |     async closeMenu() {
  13 |         await this.buttonLocator('Close Menu').click();
  14 | 
  15 |     }
  16 | 
  17 | 
  18 |     async resetAppState() {
  19 |         await this.datatestLocator('reset-sidebar-link').click();
  20 |     }
  21 | 
  22 |     async doLogout() {
  23 |         await this.datatestLocator('logout-sidebar-link').click();
  24 | 
  25 |     }
  26 | 
  27 | 
  28 |     async addProductToCart(productName) {
  29 | 
  30 |         await this.page.locator('.inventory_item').filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) }).locator('button').click();
  31 |         await this.getProductPrice(productName);
  32 |     }
  33 | 
  34 |     // Sometimes we need to add multiple product to cart randomly , then this method can be used.
  35 |     async addToCartRandomly(numberOfProducts) {
  36 |         const productNames = [];
  37 |         const addToCartButtons = this.page.locator('button:has-text("Add to cart")');
  38 | 
  39 |         for (let i = 0; i < numberOfProducts; i++) {
  40 |             const button = addToCartButtons.nth(i);
  41 | 
  42 |             const productCard = button.locator('xpath=ancestor::div[contains(@class, "inventory_item")]');
  43 |             const name = await productCard.locator('.inventory_item_name').textContent();
  44 | 
  45 |             if (name) {
  46 |                 productNames.push(name.trim());
  47 |             }
  48 |             await button.click();
  49 |         }
  50 | 
  51 | 
  52 |         return productNames;
  53 |     }
  54 | 
  55 | 
  56 |     // Get product price by product name
  57 | 
  58 | 
  59 | async getProductPrice(productName) {
  60 |     const product = this.page
  61 |         .locator('.inventory_item')
  62 |         .filter({
  63 |             has: this.page.getByText(productName)
  64 |         });
  65 | 
  66 |     const price = await product
  67 |         .locator('[data-test="inventory-item-price"]')
> 68 |         .textContent();
     |          ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  69 |     
  70 |     console.log(`Price: ${price}`);
  71 |     return price;
  72 | }
  73 | 
  74 | 
  75 | 
  76 | 
  77 |     async viewCart() {
  78 |         await this.datatestLocator('shopping-cart-link').click();
  79 |     }
  80 | 
  81 |     async getnumberOfProductsOfCart() {
  82 |         return await this.datatestLocator('shopping-cart-link').textContent();
  83 |     }
  84 | 
  85 |     async sortProductsBy(sortOption) {
  86 |         await this.datatestLocator('product-sort-container').selectOption(sortOption);
  87 |     }
  88 | 
  89 |     async addFirstProductToCart() {
  90 |         const firstProduct = this.page.locator('.inventory_item').first();
  91 |         const productName = await firstProduct.locator('.inventory_item_name').textContent();
  92 |         await firstProduct.getByRole('button', { name: 'Add to cart' }).click();
  93 |         console.log(`First product: ${productName?.trim()} added to cart`);
  94 |         return productName;
  95 |     }
  96 | 
  97 | 
  98 | 
  99 | }
```