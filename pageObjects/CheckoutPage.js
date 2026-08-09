import BasePage from "./BasePage.js";

export default class CheckoutPage extends BasePage {
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

    async totalIteamsPrice() {
        const fullText = await this.datatestLocator('subtotal-label').textContent();
        const priceText = fullText.replace('Item total: $', '').trim();
        const itemTotal = parseFloat(priceText);
        return itemTotal;
    }

    async taxPrice() {
        const fullText = await this.datatestLocator('tax-label').textContent();
        const priceTax = fullText.replace('Tax: $', '').trim();
        const totalTax = parseFloat(priceTax);
        return totalTax;
    }

    async totalPrice() {
        const totalFullText = await this.datatestLocator('total-label').textContent();
        const totalPrice = totalFullText.replace('Total: $', '').trim();
        const total = parseFloat(totalPrice);
        return total;
    }

    async finishCheckout() {
        await this.buttonLocator('Finish').click();
    }

}