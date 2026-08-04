import BasePage from "./BasePage";
import { expect } from "@playwright/test";

export default class Products extends BasePage {
    constructor(page) {
        super(page);
    }

    async openMenu() {
        await this.buttonLocator('Open Menu').click();
    }


    async resetAppState() {
        await this.datatestLocator('reset-sidebar-link').click();
    }

    async doLogout() {
        await this.datatestLocator('logout-sidebar-link').click();

    }

    async addProductToCart(productName) {
        const productLocator = this.textLocator(productName);
        await expect(productLocator).toBeVisible();
        const addToCartButton = productLocator.locator('xpath=..').locator('button');
        await expect(addToCartButton).toBeVisible();
        await addToCartButton.click();
    }
    
    async addProduct(productName) {

    await this.page.locator('.inventory_item').filter({has: this.page.locator('.inventory_item_name', { hasText: productName })}).locator('button').click();

}

}