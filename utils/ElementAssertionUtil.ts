import { Page, expect, Locator } from '@playwright/test';

class ElementAssertionUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async assertElementTextContent(locator: string | Locator, expectedTextValue: string): Promise<void> {
        const elementLocator = typeof locator === 'string' ? this.page.locator(locator) : locator;
        await expect(elementLocator).toHaveText(expectedTextValue);

        console.log(`Assertion Passed: Element at locator '${locator}' has expected text content: '${expectedTextValue}'`);
    }
}