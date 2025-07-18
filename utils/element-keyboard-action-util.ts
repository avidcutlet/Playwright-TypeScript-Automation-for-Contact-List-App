import { Page, Locator } from '@playwright/test';

import { MSG_FILL_DATA } from '@utils/messages-util';
import { EXCEPTION_ERROR_FILL_DATA } from '@utils/exception-messages-util';
import ReporterUtil from '@utils/reporter-util';

export class ElementKeyboardActionUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Input Element by locator
    async inputElementText(locator: Locator, text: string): Promise<void> {
        try {
            await locator.fill(text);
            ReporterUtil.report(this.page, MSG_FILL_DATA(locator.toString()), 'info');
        } catch (error) {
            if (error instanceof Error) {
                ReporterUtil.report(this.page, EXCEPTION_ERROR_FILL_DATA(locator.toString(), error), 'error');
            } else {
                ReporterUtil.report(this.page, EXCEPTION_ERROR_FILL_DATA(locator.toString(), new Error(String(error))), 'error');
            }
        }
    }

    // Remove Element Text by locator
    async removeElementText(locator: Locator): Promise<void> {
        try {
            await locator.fill('');
            ReporterUtil.report(this.page, MSG_FILL_DATA(locator.toString()), 'info');
        } catch (error) {
            if (error instanceof Error) {
                ReporterUtil.report(this.page, EXCEPTION_ERROR_FILL_DATA(locator.toString(), error), 'error');
            } else {
                ReporterUtil.report(this.page, EXCEPTION_ERROR_FILL_DATA(locator.toString(), new Error(String(error))), 'error');
            }
        }
    }
}