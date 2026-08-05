import BasePage from "./BasePage";
import { expect } from "@playwright/test";

export default class CartPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async getProductNames() {
        const allProductsTitle = this.datatestLocator('inventory-item-name').allInnerTexts();
        return allProductsTitle;
    }

    async goToCheckout() {
        await this.buttonLocator('checkout').click();

    }


} 