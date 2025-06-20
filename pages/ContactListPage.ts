import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class ContactListPage extends BasePage {
    // Locators for elements on the Contact List page
    // These locators are used to interact with the page elements
    protected readonly CONTACT_LIST_HEADER: Locator;
    protected readonly ADD_CONTACT_BTN: Locator; 

    constructor(page: Page) {
        super(page); // Call the constructor of BasePage
        
        this.CONTACT_LIST_HEADER = page.locator('h1');
        this.ADD_CONTACT_BTN = page.locator('#add-contact');
    }
}