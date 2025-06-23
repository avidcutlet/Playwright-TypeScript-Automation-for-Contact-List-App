import { Page, Locator } from '@playwright/test';

export class ElementMouseActionUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickElement(locator: Locator): Promise<void> {
        try {
            await locator.click();
            console.log(`Element at locator '${locator}' clicked successfully.`);

        } catch (error) {
            console.error(`Error clicking element at locator '${locator}':`, error);
            throw error; // Rethrow the error after logging
        }
    }
}