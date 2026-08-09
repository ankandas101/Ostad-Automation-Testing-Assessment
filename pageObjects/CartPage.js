import BasePage from "./BasePage.js";
import { expect } from "@playwright/test";

export default class CartPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async getProductNames() {
        const allProductsTitle = this.datatestLocator('inventory-item-name').allInnerTexts();
        return allProductsTitle;
    }

    async getProductPrices() {
        const allProductsPrice = await this.datatestLocator('inventory-item-price').allInnerTexts();
               
        const price =[];
        for (const productPrice of allProductsPrice) {
            const numericPrice = parseFloat(productPrice.replace('$', ''));
            price.push(numericPrice);
        }
        return price;
    }
        


    async goToCheckout() {
        await this.buttonLocator('checkout').click();

    }


} 