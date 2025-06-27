import { Page, Locator } from '@playwright/test';

import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';

export class BasePage {
    private page: Page;
    private elementMouseActionUtil: ElementMouseActionUtil;

    private LOGOUT_BTN: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);

        this.LOGOUT_BTN = page.getByRole('button', { name: 'Logout' });
    }

    // Click logout
    async clickLogout() {
        await this.elementMouseActionUtil.clickElement(this.LOGOUT_BTN);
    }
}