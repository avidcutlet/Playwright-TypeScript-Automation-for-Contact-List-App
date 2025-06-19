import { Page, Locator } from '@playwright/test';

export class LoginPage {
    protected readonly page: Page;

    protected readonly LOGIN_HEADER: Locator;
    protected readonly EMAIL_TXT: Locator;
    protected readonly PASSWORD_TXT: Locator;
    protected readonly SUBMIT_BTN: Locator;
    protected readonly SIGN_UP_BTN: Locator;

    constructor(page: Page) {
        this.LOGIN_HEADER = page.locator('h1:has-text("Contact List App")');
        this.EMAIL_TXT = page.locator('#email');
        this.PASSWORD_TXT = page.locator('#password');
        this.SUBMIT_BTN = page.locator('#submit');
        this.SUBMIT_BTN = page.locator('#signup');
    }
}