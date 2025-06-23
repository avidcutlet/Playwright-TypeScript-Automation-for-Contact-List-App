import { Page, expect, Locator } from '@playwright/test';

export class ElementKeyboardActionUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async inputElementText(locator: Locator, text: string): Promise<void> {
        try {
            await locator.fill(text);
            console.log(`Text '${text}' inputted into element at locator '${locator}' successfully.`);

        } catch (error) {
            console.error(`Error inputting text '${text}' into element at locator '${locator}':`, error);
            throw error; // Rethrow the error after logging
        }
    }

    async removeElementText(locator: Locator): Promise<void> {
        try {
            await locator.fill('');
            console.log(`Text removed from element at locator '${locator}' successfully.`);

        } catch (error) {
            console.error(`Error removing text from element at locator '${locator}':`, error);
            throw error; // Rethrow the error after logging
        }
    }
}