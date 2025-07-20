import { Page, Locator } from '@playwright/test';

import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';

export class ContactListPage {
    private page: Page;
    private elementMouseActionUtil: ElementMouseActionUtil; 

    private contactListHeader: Locator;
    private addContactBtn: Locator;

    private contactListURLRegex: RegExp;

    constructor(page: Page) {
        this.page = page;
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);

        this.contactListHeader = page.getByRole('heading', { name: 'Contact List' });
        this.addContactBtn = page.getByRole('button', { name: 'Add a New Contact' });

        this.contactListURLRegex = /.*\/contactList/;
    }

    // Return contact list
    async verifyContactListHeader(): Promise<string | null> {
      return await this.contactListHeader.textContent();
    }

    // Wait for the URL to contain '/contactList'
    async waitForContactListPageLoad(): Promise<void> {
      await this.page.waitForURL(this.contactListURLRegex);
    }

    // Click add contact
    async clickAddContact(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.addContactBtn);
    }

    // Click Contact by name
    async clickContactByName(contactName: string): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.page.getByRole('cell', { name: contactName }));
    }
}