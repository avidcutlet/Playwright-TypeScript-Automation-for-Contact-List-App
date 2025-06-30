import { test, Page, TestInfo } from '@playwright/test';

import { LoggingUtility } from '@utils/logger-util';

import * as dotenv from 'dotenv';
dotenv.config();

const loggingUtility = new LoggingUtility();

declare global {
    var TEST_NAME: string;
    var DESCRIBE_NAME: string;
}

global.TEST_NAME = '';
global.DESCRIBE_NAME = '';

// Extract describe details in test describe
export function extractDescribeDetails(testInfo: TestInfo): { describeName: string; testName: string } {
    const titlePath: string[] = testInfo.titlePath;
    let describeName: string = titlePath[1] || 'No describe';
    let testName: string = testInfo.title;

    if (describeName.includes('@')) {
        describeName = describeName.split('@')[0].trim();
    }

    if (testName.includes('@')) {
        testName = testName.split('@')[0].trim();
    }

    return { describeName, testName };
}

// Logs message before all hook
export const beforeAllHook = async (): Promise<void> => {
    loggingUtility.logMessage('info', `Test Suite is Starting`);
};

// Setup up Describe details and goto function
export const beforeEachHook = async ({ page }: { page: Page }, testInfo: TestInfo): Promise<void> => {
    const { describeName, testName } = extractDescribeDetails(testInfo);
    global.TEST_NAME = testName;
    global.DESCRIBE_NAME = describeName;

    loggingUtility.logMessage('info', `The test is running: ${testName}`);

    await page.goto(process.env.BASE_URL || 'https://example.com');
};

// Setup log after each test and logs messages
export const teardownHook = async ({ page }: { page: Page }, testInfo: TestInfo): Promise<void> => {
    
    loggingUtility.logMessage('info', `The test completed successfully: ${global.TEST_NAME}`);
    
    // await page.close();
};

// Log message after all hooks
export const afterAllHook = async (): Promise<void> => {
    loggingUtility.logMessage('info', `The Suite is completed: ${global.TEST_NAME}`);
};

// Initilize all Hooks
export function initializeTestHooks(): { setupHooks: () => void } {
    const testInstance = test;
    return {
        setupHooks: (): void => {
            testInstance.beforeAll(beforeAllHook);
            testInstance.beforeEach(beforeEachHook);
            testInstance.afterEach(teardownHook);
            testInstance.afterAll(afterAllHook);
        },
    };
}