import { Page, expect, Locator } from '@playwright/test';

export class ElementAssertionUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async isDomContentLoaded(): Promise<void> {
        try {   
            await this.page.waitForLoadState('domcontentloaded');
            console.log('DOM content loaded successfully.');
                
        } catch (error) {  
            console.error('Error waiting for DOM content to load:', error);
            throw error; // Rethrow the error after logging
        }
    }
}