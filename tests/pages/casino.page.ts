import { FrameLocator, Page } from "@playwright/test";

import { DashBoardPage } from "./dashboard.page";

export class CasinoPage extends DashBoardPage{    
    constructor(page: Page) {
        super(page) 
    }

    async goto() {
        await super.goto("/casino")
    }

    get gameIframe() {return this.page.frameLocator('#game')}

    get balanceLable() {return this.page.frameLocator('#game').locator('.game__header div:nth-child(2)')}
    
    // I don't like locators like this (just for tag names) but there is no other way
    get betSelect() {return this.page.frameLocator('#game').locator('select')}

    async getAllCats() {
        // Wait for all casino cats loaded
        await this.page.frameLocator('#game').locator('div.option').nth(3).waitFor()
        return await this.page.frameLocator('#game').locator('div.option').all()
    }

    async winCat1()  { return (await this.getAllCats())[0] }
    async loseCat2() { return (await this.getAllCats())[1] }
    async winCat3()  { return (await this.getAllCats())[2] }
    async winCat4()  { return (await this.getAllCats())[3] }

    // The same comment as for getElementWithText method about finding elements by text
    async getFrameElementWithText(tag: String, text: string) {
        return  this.page.frameLocator('#game').locator(`//${tag}[contains(.,"${text}")]`)
    }
}