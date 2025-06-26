import { Page, Locator } from '@playwright/test';
import { BasePage } from '@pages/base-page';
import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';
import { ElementKeyboardActionUtil } from '@utils/element-keyboard-action-util';

export class ContactListPage extends BasePage {
    protected readonly elementMouseActionUtil: ElementMouseActionUtil; 
    protected readonly elementKeyboardActionUtil: ElementKeyboardActionUtil;

    protected readonly contactListHeader: Locator;
    protected readonly addContactBtn: Locator;

    constructor(page: Page) {
        super(page); // Call the constructor of BasePage
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);
        this.elementKeyboardActionUtil = new ElementKeyboardActionUtil(page);

        this.contactListHeader = page.getByRole('heading', { name: 'Contact List' });
        this.addContactBtn = page.getByRole('button', { name: 'Add a New Contact' });
    }

    async verifyContactListHeader(): Promise<Locator> {
        return this.contactListHeader;
    }

    async clickAddContactButton() {
        await this.elementMouseActionUtil.clickElement(this.addContactBtn);
    }
}