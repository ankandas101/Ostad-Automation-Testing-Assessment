import BasePage from "./BasePage";
import { expect } from "@playwright/test";

export default class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async openMenu() {
        await this.buttonLocator('Open Menu').click();
    }
    async closeMenu() {
        await this.buttonLocator('Close Menu').click();

    }


    async resetAppState() {
        await this.datatestLocator('reset-sidebar-link').click();
    }

    async doLogout() {
        await this.datatestLocator('logout-sidebar-link').click();

    }


    async addProductToCart(productName) {

        await this.page.locator('.inventory_item').filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) }).locator('button').click();
        await this.getProductPrice(productName);
    }

    // Sometimes we need to add multiple product to cart randomly , then this method can be used instade of testData.js 
    async addToCartRandomly(numberOfProducts) {
        const productNames = [];
        const addToCartButtons = this.page.locator('button:has-text("Add to cart")');

        for (let i = 0; i < numberOfProducts; i++) {
            const button = addToCartButtons.nth(i);

            const productCard = button.locator('xpath=ancestor::div[contains(@class, "inventory_item")]');
            const name = await productCard.locator('.inventory_item_name').textContent();

            if (name) {
                productNames.push(name.trim());
            }
            await button.click();
        }
        return productNames;
    }


    // Get product price by product name
    async getProductPrice(productName) {
        const product = this.page.locator('.inventory_item').filter({ has: this.page.getByText(productName) });
        const priceText = await product.locator('[data-test="inventory-item-price"]').textContent();
        const price = parseFloat(priceText.replace('$', ''));
        return price;
    }


    async viewCart() {
        await this.datatestLocator('shopping-cart-link').click();
    }

    async getnumberOfProductsOfCart() {
        return await this.datatestLocator('shopping-cart-link').textContent();
    }

    async sortProductsBy(sortOption) {
        await this.datatestLocator('product-sort-container').selectOption(sortOption);
    }

    async addFirstProductToCart() {
        const firstProduct = this.page.locator('.inventory_item').first();
        const productName = await firstProduct.locator('.inventory_item_name').textContent();
        await firstProduct.getByRole('button', { name: 'Add to cart' }).click();
        console.log(`First product: ${productName?.trim()} added to cart`);
        return productName;
    }



}