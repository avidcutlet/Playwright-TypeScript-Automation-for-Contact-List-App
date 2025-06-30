import { Page, Locator } from '@playwright/test';

import { MSG_CLICK_MESSAGE } from '@utils/messages-util';
import { EXCEPTION_ERROR_CLICK_ELEMENT } from '@utils/exception-messages-util';
import ReporterUtil from '@utils/reporter-util';

export class ElementMouseActionUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Click element by locator
    async clickElement(locator: Locator): Promise<void> {
        try {
            await locator.click();
            ReporterUtil.report(this.page, MSG_CLICK_MESSAGE(locator.toString()), 'info');

        } catch (error) {
            ReporterUtil.report(this.page, EXCEPTION_ERROR_CLICK_ELEMENT(locator.toString(), error as Error), 'error');
            throw error;
        }
    }
}