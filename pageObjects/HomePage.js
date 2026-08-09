import BasePage from "./BasePage.js";
import { expect } from "@playwright/test";

export default class HomePage extends BasePage {
    constructor(page) {
        super(page);
    }

    async fillLoginForm(username,password) {
        await this.fillInput(this.datatestLocator('username'),username);
        await this.fillInput(this.datatestLocator('password'),password);
        

    }

    async doLogin(username,password){
        await this.fillLoginForm(username,password);
        await this.datatestLocator('login-button').click();
    }

}