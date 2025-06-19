import { Page, Locator } from '@playwright/test';

export class ContactListPage {
    protected readonly page: Page;

    protected readonly CONTACT_LIST_HEADER: Locator;
    protected readonly ADD_CONTACT_BTN: Locator; 

    constructor(page: Page) {
        super(page); // Call the constructor of BasePage
        
        this.CONTACT_LIST_HEADER = page.locator('h1');
        this.ADD_CONTACT_BTN = page.locator('#add-contact')
    }
}