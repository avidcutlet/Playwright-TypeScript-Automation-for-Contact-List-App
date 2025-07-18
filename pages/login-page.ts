import { Page, Locator } from '@playwright/test';

import { ElementKeyboardActionUtil } from '../utils/element-keyboard-action-util';
import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';

export class LoginPage {
    private elementKeyboardActionUtil: ElementKeyboardActionUtil;
    private elementMouseActionUtil: ElementMouseActionUtil;

    private loginHeader: Locator;
    private emailTxt: Locator;
    private passwordTxt: Locator;
    private submitBtn: Locator;
    private cancelBtn: Locator;
    private signUpBtn: Locator;

    constructor(page: Page) {
        this.elementKeyboardActionUtil = new ElementKeyboardActionUtil(page);
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);

        this.loginHeader = page.getByRole('heading', { name: 'Contact List App' });
        this.emailTxt = page.getByRole('textbox', { name: 'Email' });
        this.passwordTxt = page.getByRole('textbox', { name: 'Password' });
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
        this.signUpBtn = page.getByRole('button', { name: 'Sign up' });
    }

    // Return login header text
    async verifyLoginHeader(): Promise<string | null> {
        return this.loginHeader.textContent();
    }
 
    // Input email
    async enterEmail(email: string): Promise<void> {
        await this.elementKeyboardActionUtil.inputElementText(this.emailTxt, email);
    }

    // Input password
    async enterPassword(password: string): Promise<void> {
        await this.elementKeyboardActionUtil.inputElementText(this.passwordTxt, password);
    }

    // Click submit
    async clickSubmit(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.submitBtn);
    }

    // Click cancel
    async clickCancel(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.cancelBtn);
    }

    // Click sign up
    async clickSignUp(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.signUpBtn);
    }
}