import { Page, Locator } from '@playwright/test';

import { ElementKeyboardActionUtil } from '@utils/element-keyboard-action-util';
import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';

export class SignUpPage {
    private elementKeyboardActionUtil: ElementKeyboardActionUtil; 
    private elementMouseActionUtil: ElementMouseActionUtil;

    private addUserHeader: Locator;
    private firstNameTxt: Locator;
    private lastNameTxt: Locator;
    private emailTxt: Locator;
    private passwordTxt: Locator;
    private submitBtn: Locator;
    private cancelBtn: Locator;
    private errorMessage: Locator;
    private existingEmailErrorMessage: Locator;

    constructor(page: Page) {
        this.elementKeyboardActionUtil = new ElementKeyboardActionUtil(page);
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);

        this.addUserHeader = page.getByRole('heading', { name: 'Add User' });
        this.firstNameTxt = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameTxt = page.getByRole('textbox', { name: 'Last Name' });
        this.emailTxt = page.getByRole('textbox', { name: 'Email' });
        this.passwordTxt = page.getByRole('textbox', { name: 'Password' });
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
        this.errorMessage = page.getByText('User validation failed:');
        this.existingEmailErrorMessage = page.getByText('Email address is already in');
    }

    // Return add user header locator
    async verifyAddUserHeader(): Promise<string | null> {
        return await this.addUserHeader.textContent();
    }

    // Input firstname
    async enterFirstName(firstName: string): Promise<void> {
        await this.elementKeyboardActionUtil.inputElementText(this.firstNameTxt, firstName);
    }

    // Input lastname
    async enterLastName(lastName: string): Promise<void> {
        await this.elementKeyboardActionUtil.inputElementText(this.lastNameTxt, lastName);
    }

    // Input email
    async enterEmail(email: string): Promise<void> {
        await this.elementKeyboardActionUtil.inputElementText(this.emailTxt, email);
    }

    // Input password
    async enterPassword(password: string): Promise<void> {
        await this.elementKeyboardActionUtil.inputElementText(this.passwordTxt, password);
    }

    // Returns error message by key
    async getErrorMessageByKey(key: string): Promise<string | null> {
        switch (key) {
            case 'existingEmail':
            return this.existingEmailErrorMessage.textContent();
            default:
            return this.errorMessage.textContent();
        }
    }

    // Click submit
    async clickSubmit(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.submitBtn);
    }

    // Click cancel
    async clickCancel(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.cancelBtn);
    }
}