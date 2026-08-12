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
  - waiting for locator('.inventory_item').filter({ has: getByText('Sauce Labs Backpack,Sauce Labs Bolt T-Shirt,Sauce Labs Onesie') }).locator('[data-test="inventory-item-price"]')

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
      - generic [ref=e15]:
        - generic [ref=e16]: Products
        - generic [ref=e18] [cursor=pointer]:
          - generic [ref=e19]: Name (A to Z)
          - combobox [ref=e20]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e24]:
      - generic [ref=e25]:
        - link [ref=e27] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e28]
        - generic [ref=e29]:
          - generic [ref=e30]:
            - link "Sauce Labs Backpack" [ref=e31] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e33]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e34]:
            - generic [ref=e35]: $29.99
            - button "Remove" [ref=e36] [cursor=pointer]
      - generic [ref=e37]:
        - link [ref=e39] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e40]
        - generic [ref=e41]:
          - generic [ref=e42]:
            - link "Sauce Labs Bike Light" [ref=e43] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e45]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e46]:
            - generic [ref=e47]: $9.99
            - button "Add to cart" [ref=e48] [cursor=pointer]
      - generic [ref=e49]:
        - link [ref=e51] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e52]
        - generic [ref=e53]:
          - generic [ref=e54]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e55] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e57]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e58]:
            - generic [ref=e59]: $15.99
            - button "Remove" [ref=e60] [cursor=pointer]
      - generic [ref=e61]:
        - link [ref=e63] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e64]
        - generic [ref=e65]:
          - generic [ref=e66]:
            - link "Sauce Labs Fleece Jacket" [ref=e67] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e69]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e70]:
            - generic [ref=e71]: $49.99
            - button "Add to cart" [ref=e72] [cursor=pointer]
      - generic [ref=e73]:
        - link [ref=e75] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e76]
        - generic [ref=e77]:
          - generic [ref=e78]:
            - link "Sauce Labs Onesie" [ref=e79] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e81]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e82]:
            - generic [ref=e83]: $7.99
            - button "Remove" [ref=e84] [cursor=pointer]
      - generic [ref=e85]:
        - link [ref=e87] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e88]
        - generic [ref=e89]:
          - generic [ref=e90]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e91] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e93]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e94]:
            - generic [ref=e95]: $15.99
            - button "Add to cart" [ref=e96] [cursor=pointer]
  - contentinfo [ref=e97]:
    - list [ref=e98]:
      - listitem [ref=e99]:
        - link "Twitter" [ref=e100] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e101]:
        - link "Facebook" [ref=e102] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e103]:
        - link "LinkedIn" [ref=e104] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e105]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
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
  50 |         return productNames;
  51 |     }
  52 | 
  53 | 
  54 |     // Get product price by product name
  55 | 
  56 | 
  57 |     async getProductPrice(productName) {
  58 |         const product = this.page.locator('.inventory_item').filter({ has: this.page.getByText(productName) });
> 59 |         const priceText = await product.locator('[data-test="inventory-item-price"]').textContent();
     |                                                                                       ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  60 |         const price = parseFloat(priceText.replace('$', ''));
  61 |         return price;
  62 |     }
  63 | 
  64 | 
  65 | 
  66 | 
  67 |     async viewCart() {
  68 |         await this.datatestLocator('shopping-cart-link').click();
  69 |     }
  70 | 
  71 |     async getnumberOfProductsOfCart() {
  72 |         return await this.datatestLocator('shopping-cart-link').textContent();
  73 |     }
  74 | 
  75 |     async sortProductsBy(sortOption) {
  76 |         await this.datatestLocator('product-sort-container').selectOption(sortOption);
  77 |     }
  78 | 
  79 |     async addFirstProductToCart() {
  80 |         const firstProduct = this.page.locator('.inventory_item').first();
  81 |         const productName = await firstProduct.locator('.inventory_item_name').textContent();
  82 |         await firstProduct.getByRole('button', { name: 'Add to cart' }).click();
  83 |         console.log(`First product: ${productName?.trim()} added to cart`);
  84 |         return productName;
  85 |     }
  86 | 
  87 | 
  88 | 
  89 | }
```