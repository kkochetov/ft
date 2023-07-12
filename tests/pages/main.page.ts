import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class MainPage extends BasePage{    
    constructor(page: Page) {
        super(page)    
    }

    async goto() {
        await super.goto("/tour")
    }

    get newUserButton() { return  this.page.locator('button.register') }
    get returningUserButton() { return  this.page.locator('button:not(.register)') }
    get introButton() { return this.page.locator('button.button--intro')}
    
    get loginField() {return this.page.locator('input.input')}
    get submitButton() { return this.page.locator('button.input-button')}

    get phoneCountryCodeField() {return this.page.locator('input.phone-number-input--small')}
    get phoneField() {return this.page.locator('input.phone-number-input:not(.phone-number-input--small)')}

    login = async (user: string, password: string) => {
        await this.goto()
        await this.returningUserButton.click()
    
        //email
        await this.loginField.fill(user)
        await this.submitButton.click()
        
        //password
        // I can't understand why a password is not required there. But I have a lack of product knowledge for now.
        // await mainPage.loginField.fill(password)
        // await mainPage.submitButton.click()
    }

}