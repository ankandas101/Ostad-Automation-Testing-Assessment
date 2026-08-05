import BasePage from "./BasePage";
import { expect } from "@playwright/test";

export default class Products extends BasePage {
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
    }

    async addToCartRandomly(numberOfProducts) {

        const addToCartButtons = this.page.locator('button:has-text("Add to cart")');
        for (let i = 0; i < numberOfProducts; i++) {
            await addToCartButtons.nth(i).click();
        }
    }

    async viewCart() {
        await this.datatestLocator('shopping-cart-link').click();
    }

    async getnumberOfProductsOfCart(){
    return await this.datatestLocator('shopping-cart-link').textContent();
    }

    
}