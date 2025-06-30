import { Page, Locator } from '@playwright/test';

import { ElementMouseActionUtil } from '@utils/element-mouse-action-util';

export class BasePage {
    private elementMouseActionUtil: ElementMouseActionUtil;

    private logoutBtn: Locator; 

    constructor(page: Page) {
        this.elementMouseActionUtil = new ElementMouseActionUtil(page);

        this.logoutBtn = page.getByRole('button', { name: 'Logout' });
    }

    // Click logout
    async clickLogout() {
        await this.elementMouseActionUtil.clickElement(this.logoutBtn);
    }
}