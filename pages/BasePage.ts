import { Page, Locator } from '@playwright/test';
import { ElementMouseActionUtil } from '@utils/ElementMouseActionUtil';

export class BasePage {
    protected readonly page: Page;
    protected readonly elementMouseActionUtil: ElementMouseActionUtil;

    protected readonly LOGOUT_BTN: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);

        this.LOGOUT_BTN = page.getByRole('button', { name: 'Logout' });
    }

    async clickLogout() {
        await this.elementMouseActionUtil.clickElement(this.LOGOUT_BTN);
    }
}