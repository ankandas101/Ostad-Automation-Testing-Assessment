import BasePage from "./BasePage.js";

export default class CompleteOrderPage extends BasePage {
    constructor(page) {
        super(page);
    }
    async getFinalCheckoutMessage() {
        await this.datatestLocator('complete-text').waitFor({ state: 'visible' });
        return await this.datatestLocator('complete-text').textContent();
    }

    async goToHome() {
        await this.buttonLocator('Back Home').click();
    }



}