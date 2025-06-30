import { Page, Locator } from '@playwright/test';

import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';

export class ContactDetailsPage {
    private elementMouseActionUtil: ElementMouseActionUtil;

    private contactDetailsHeader: Locator;
    private editContactBtn: Locator;
    private deleteContactBtn: Locator;
    private returnBtn: Locator;

    constructor(page: Page) {
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);

        this.contactDetailsHeader = page.getByRole('heading', { name: 'Contact Details' });
        this.editContactBtn = page.getByRole('button', { name: 'Edit Contact' });
        this.deleteContactBtn = page.getByRole('button', { name: 'Delete Contact' });
        this.returnBtn = page.getByRole('button', { name: 'Return to Contact List' });
    }

    // Return contact details header locator
    async verifyContactDetailsHeader(): Promise<Locator> {
        return this.contactDetailsHeader;
    }

    // Click edit contact
    async clickEditContact(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.editContactBtn);
    }

    // Click delete contact
    async clickDeleteContact(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.deleteContactBtn);
    }

    // Click return
    async clickReturn(): Promise<void> {
        await this.elementMouseActionUtil.clickElement(this.returnBtn);
    }

}