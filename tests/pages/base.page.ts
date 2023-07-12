import { Page } from '@playwright/test';


export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url = "/") {
        await this.page.goto(url)
    }

    async getElementWithText(tag: String, text: string) {
        return this.page.locator(`//${tag}[contains(.,"${text}")]`)
    }
    
    // To debug purpose
    async logToBrowserConsole(log: any) {
        await this.page.evaluate(`console.log("[TEST]: ${log}")`)
    }
}