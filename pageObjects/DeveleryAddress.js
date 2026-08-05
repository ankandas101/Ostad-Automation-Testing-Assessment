import BasePage from "./BasePage";
export default class DeveleryAddress extends BasePage {
    constructor(page) {
        super(page);
    }


    async fillDeveleryAddress(firstName, lastName, postalCode) {

        await this.fillInput(this.datatestLocator('firstName'), firstName);
        await this.fillInput(this.datatestLocator('lastName'), lastName);
        await this.fillInput(this.datatestLocator('postalCode'), postalCode);
    }

    async goToFinalCheckout(firstName, lastName, postalCode) {
        await this.fillDeveleryAddress(firstName, lastName, postalCode);
        await this.buttonLocator('continue').click();
    }

}