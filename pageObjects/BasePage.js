import { expect } from "@playwright/test";

export default class BasePage {

    constructor(page) {
        this.page = page;
    }
    datatestLocator(dataTest) {
        return this.page.locator(`[data-test='${dataTest}']`);
    }

    textLocator(text) {
        return this.page.getByText(text);
    }

    async fillInput(locator, value) {
        const loc = await locator;
        expect(loc).toBeVisible();
        await loc.fill(value);
    }

    async getErrorMessage(){
        return await this.datatestLocator('error').textContent();  
    }

    buttonLocator(buttonText) {
        return this.page.getByRole('button', { name: buttonText });
    }
}
