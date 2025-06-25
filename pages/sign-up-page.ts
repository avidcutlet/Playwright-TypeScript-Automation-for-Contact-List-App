import { Page, Locator } from '@playwright/test';
import { ElementKeyboardActionUtil } from '@utils/element-keyboard-action-util';
import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';

export class SignUpPage {
    protected readonly page: Page;
    protected readonly elementMouseActionUtil: ElementMouseActionUtil;
    protected readonly elementKeyboardActionUtil: ElementKeyboardActionUtil; // Assuming this is defined elsewhere, as it's not in the original code

    protected readonly addUserHeader: Locator;
    protected readonly firstNameTxt: Locator;
    protected readonly lastNameTxt: Locator;
    protected readonly emailTxt: Locator;
    protected readonly passwordTxt: Locator;
    protected readonly submitBtn: Locator;
    protected readonly cancelBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);
        this.elementKeyboardActionUtil = new ElementKeyboardActionUtil(page);

        this.addUserHeader = page.getByRole('heading', { name: 'Add User' });
        this.firstNameTxt = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameTxt = page.getByRole('textbox', { name: 'Last Name' });
        this.emailTxt = page.getByRole('textbox', { name: 'Email' });
        this.passwordTxt = page.getByRole('textbox', { name: 'Password' });
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
    }

    async verifyAddUserHeader(): Promise<string | null> {
        return await this.addUserHeader.textContent();
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this.elementKeyboardActionUtil.inputElementText(this.firstNameTxt, firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.elementKeyboardActionUtil.inputElementText(this.lastNameTxt, lastName);
    }

    async enterEmail(email: string): Promise<void> {
        await this.elementKeyboardActionUtil.inputElementText(this.emailTxt, email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.elementKeyboardActionUtil.inputElementText(this.passwordTxt, password);
    }

    async clickSubmit(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.submitBtn);
    }

    async clickCancel(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.cancelBtn);
    }
}