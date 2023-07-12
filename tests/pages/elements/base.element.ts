import { Page } from "@playwright/test";

export class BaseElement {
    page: Page

    constructor(page: Page) {
        this.page = page;
    }
    
    /*
    * Because of the lack of data attributes for testing
    * and different CSS classes for locator I decide to
    * find some elements by text.
    * Looks like it's not a good way to find elements (localization can brake it)
    * but without access to the code of the product I can't add tag attributes to find elements.
    * 
    * Also, finding elements by text is closer to end-user behavior. Sometimes it's not so bad.
    */
    async getElementWithText(tag: String, text: string) {
        return this.page.locator(`//${tag}[.="${text}"]`)
    }
}