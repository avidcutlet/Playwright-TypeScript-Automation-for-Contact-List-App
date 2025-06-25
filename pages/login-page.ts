import { Page, Locator } from '@playwright/test';
import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';
import { ElementKeyboardActionUtil } from '../utils/element-keyboard-action-util';

export class LoginPage {
    protected readonly page: Page;
    protected readonly elementMouseActionUtil: ElementMouseActionUtil;
    protected readonly elementKeyboardActionUtil: ElementKeyboardActionUtil;

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

        // Using getByRole locators from Playwright codegen
        this.loginHeader = page.getByRole('heading', { name: 'Contact List App' });
        this.emailTxt = page.getByRole('textbox', { name: 'Email' });
        this.passwordTxt = page.getByRole('textbox', { name: 'Password' });
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
        this.signUpBtn = page.getByRole('button', { name: 'Sign up' });
    }

    async verifyLoginHeader(): Promise<string | null> {
        return this.loginHeader.textContent();
    }
 
    // add promise void
    async enterEmail(email: string): Promise<void> {
        console.log(`#5 <<<<<<<<<<<<<<< User created with email: ${email}`);
        await this.elementKeyboardActionUtil.inputElementText(this.emailTxt, email);
        console.log(`#6 <<<<<<<<<<<<<<< User created with email: ${email}`);
    }

    async enterPassword(password: string): Promise<void> {
    console.log(`#7 <<<<<<<<<<<<<<< User created with password: ${password}`);
    await this.elementKeyboardActionUtil.inputElementText(this.passwordTxt, password);
    console.log(`#8 <<<<<<<<<<<<<<< User created with password: ${password}`);
    }

    async clickSubmit(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.submitBtn);
    }

    async clickCancel(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.cancelBtn);
    }

    async clickSignUp(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.signUpBtn);
    }

}