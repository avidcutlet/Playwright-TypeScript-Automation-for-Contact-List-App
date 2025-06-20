import { Page, expect, Locator } from '@playwright/test';

class ElementKeyboardActionUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }