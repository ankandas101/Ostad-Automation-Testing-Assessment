import BasePage from "./BasePage";
import { expect } from "@playwright/test";

export default class Cart extends BasePage {
    constructor(page) {
        super(page);
    }

    async getProductName() {
        const allProductsTitle = this.datatestLocator('inventory-item-name').allInnerTexts();
        return allProductsTitle;
    }


}