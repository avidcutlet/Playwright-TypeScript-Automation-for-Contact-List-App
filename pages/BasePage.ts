import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    protected readonly LOGOUT_BTN: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.LOGOUT_BTN = page.locator('#logout');
    }
}