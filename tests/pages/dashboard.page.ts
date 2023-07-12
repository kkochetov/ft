import { Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { DepositElement } from './elements/deposit.element'

export class DashBoardPage extends BasePage{    
    constructor(page: Page) {
        super(page)    
    }

    async goto(url = "/") {
        await super.goto(url)
    }

    get depositeButton() {return this.page.locator('button.money')}
    get navigationMenu() {return this.page.locator('div#navigation')}
    get depositElement() {return new DepositElement(this.page)}

    async getMenuElement(element: string) { return this.getElementWithText('a', element) }
}