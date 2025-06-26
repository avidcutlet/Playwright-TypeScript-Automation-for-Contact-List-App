import { Page, Locator } from '@playwright/test';
import { MSG_VISIBLE_ELEMENT, EXCEPTION_ERROR_VISIBLE_ELEMENT } from '@utils/messages-util';
import ReporterUtil from '@utils/reporter-util';

export class ElementWaitUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForElement(selector: Locator, state: 'visible' | 'hidden' | 'attached' | 'detached'): Promise<void> {
        try {
            await selector.waitFor({ state: state });
            ReporterUtil.report(this.page, MSG_VISIBLE_ELEMENT(selector.toString()), 'info');

        } catch (error) {
            ReporterUtil.report(this.page, EXCEPTION_ERROR_VISIBLE_ELEMENT(selector.toString(), error as Error), 'error');
            throw error;
        }
    }
}
