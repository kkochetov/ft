import { Page } from "@playwright/test";
import { BaseElement } from "./base.element";

export class DepositElement extends BaseElement{
    constructor(page: Page) {
        super(page)
    }

    close = async () => {
       await this.page.locator('div.modal__x').click()
    }

    get cardButton() {return this.getElementWithText('button', 'Card')}
    get directBankButton() {return this.getElementWithText('button', 'Direct Bank')}
    get eWalletBankButton() {return this.getElementWithText('button', 'E-wallet')}

    get deposit10Button() {return this.getElementWithText('button', '€10')}
    get deposit50Button() {return this.getElementWithText('button', '€50')}
    get deposit100Button() {return this.getElementWithText('button', '€100')}
    get deposit500Button() {return this.getElementWithText('button', '€500')}

    get depositApprovedButton() {return this.getElementWithText('button', 'Deposit Approved')}
    get depositFailedButton() {return this.getElementWithText('button', 'Deposit Failed')}

    get OkButton() {return this.getElementWithText('button', 'OK')}

}