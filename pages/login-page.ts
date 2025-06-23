import { Page, Locator } from '@playwright/test';
import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';
import { ElementKeyboardActionUtil } from '../utils/element-keyboard-action-util';
import { ElementAssertionUtil } from '../utils/element-assertion-util';

export class LoginPage {
    protected readonly page: Page;
    protected readonly elementMouseActionUtil: ElementMouseActionUtil;
    protected readonly elementKeyboardActionUtil: ElementKeyboardActionUtil;
    protected readonly elementAssertionUtil: ElementAssertionUtil;

    protected readonly loginHeader: Locator;
    protected readonly emailTxt: Locator;
    protected readonly passwordTxt: Locator;
    protected readonly submitBtn: Locator;
    protected readonly cancelBtn: Locator;
    protected readonly signUpBtn: Locator;

    constructor(page: Page) {
        this.page = page; // Assign the page instance
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);
        this.elementKeyboardActionUtil = new ElementKeyboardActionUtil(page);
        this.elementAssertionUtil = new ElementAssertionUtil(page);

        // Using getByRole locators from Playwright codegen
        this.loginHeader = page.getByRole('heading', { name: 'Contact List App' });
        this.emailTxt = page.getByRole('textbox', { name: 'Email' });
        this.passwordTxt = page.getByRole('textbox', { name: 'Password' });
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
        this.signUpBtn = page.getByRole('button', { name: 'Sign up' });
    }

    async isDomContentLoaded() {
        await this.elementAssertionUtil.isDomContentLoaded();
    }

    async loginHeaderTextContent(): Promise<string | null> {
        return this.loginHeader.textContent();
    }
 
    async enterEmail(email: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.emailTxt, email);
    }

    async enterPassword(password: string) {
        await this.elementKeyboardActionUtil.inputElementText(this.passwordTxt, password);
    }

    async clickSubmit() {
        await this.elementMouseActionUtil.clickElement(this.submitBtn);
    }

    async clickCancel() {
        await this.elementMouseActionUtil.clickElement(this.cancelBtn);
    }

    async clickSignUp() {
        await this.elementMouseActionUtil.clickElement(this.signUpBtn);
    }

}