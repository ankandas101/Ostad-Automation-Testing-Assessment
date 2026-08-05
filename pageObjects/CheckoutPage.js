import BasePage from "./BasePage";

export default class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async getProductNames() {
        const allProductsTitle = this.datatestLocator('inventory-item-name').allInnerTexts();
        return allProductsTitle;
    }

    async finishCheckout() {
        await this.buttonLocator('Finish').click();
    }

}