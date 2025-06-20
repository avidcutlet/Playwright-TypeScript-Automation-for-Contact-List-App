import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

export class AddContactPage extends BasePage {
    protected readonly CONTACT_LIST_HEADER: Locator;

    protected readonly FIRSTNAME_TXT: Locator;
    protected readonly LASTNAME_TXT: Locator;
    protected readonly BIRTHDATE_TXT: Locator;
    protected readonly EMAIL_TXT: Locator;
    protected readonly PHONE_TXT: Locator;
    protected readonly STREET1_TXT: Locator;
    protected readonly STREET2_TXT: Locator;
    protected readonly CITY_TXT: Locator;
    protected readonly STATEPROVINCE_TXT: Locator;
    protected readonly POSTALCODE_TXT: Locator;
    protected readonly COUNTRY_TXT: Locator;
    
    protected readonly SUBMIT_BTN: Locator;
    protected readonly CANCEL_BTN: Locator;

    constructor(page: Page) {
        super(page); // Call the constructor of BasePage

        this.CONTACT_LIST_HEADER = page.locator('h1:has-text("Contact List")');

        this.FIRSTNAME_TXT = page.locator("#firstName");
        this.LASTNAME_TXT = page.locator("#lastName");
        this.BIRTHDATE_TXT = page.locator("#birthdate");
        this.EMAIL_TXT = page.locator("#email");
        this.PHONE_TXT = page.locator("#phone");
        this.STREET1_TXT = page.locator("#street1");
        this.STREET2_TXT = page.locator("#street2");
        this.CITY_TXT = page.locator("#city");
        this.STATEPROVINCE_TXT = page.locator("#stateProvince");
        this.POSTALCODE_TXT = page.locator("#postalCode");
        this.COUNTRY_TXT = page.locator("#country");
        
        this.SUBMIT_BTN = page.locator("#submit");
        this.CANCEL_BTN = page.locator("#cancel");
    }
}