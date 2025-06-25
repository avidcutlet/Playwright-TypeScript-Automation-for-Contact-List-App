import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { Page } from 'playwright';

import { LoggingUtility } from '@utils/logger-util';

const loggingUtility = new LoggingUtility();

class ScreenshotUtil {
    static screenshotBasePath: string = path.join(process.cwd(), 'reports', 'screenshots');
    static executionFolder: string | null = null;
    static isInitialized: boolean = false;

    static getLatestFolder(): string | null {
        try {
            // Ensure the base directory exists
            if (!fs.existsSync(this.screenshotBasePath)) {
                fs.mkdirSync(this.screenshotBasePath, { recursive: true });
            }
    
            const DIRECTORY_CONTENTS = fs.readdirSync(this.screenshotBasePath, { withFileTypes: true });
    
            const FOLDER_DETAILS = DIRECTORY_CONTENTS
                .filter(entry => entry.isDirectory())
                .map(folder => ({
                    folderName: folder.name,
                    modificationTime: fs.statSync(path.join(this.screenshotBasePath, folder.name)).mtime,
                }));
    
            FOLDER_DETAILS.sort((folderA, folderB) => folderB.modificationTime.getTime() - folderA.modificationTime.getTime());
    
            if (FOLDER_DETAILS.length > 0) {
                return path.join(this.screenshotBasePath, FOLDER_DETAILS[0].folderName);
            } else {
                loggingUtility.logMessage('error', `No folders found`);
                throw new Error('No folders found in the specified directory.');
            }
        } catch (error) {
            loggingUtility.logMessage('error', `Error retrieving latest folder:`);
            return null;
        }
    }

    // Method to capture a screenshot and attach it to Allure
    static async takeScreenshot(
        page: Page,
        scenario: string,
        testCase: string,
        iteration: string = '',
        takeScreenshot: string = 'Yes'
    ): Promise<void> {
        if (takeScreenshot.toLowerCase() === 'no') {
            return;
        }

        const LATEST_FOLDER = this.getLatestFolder();
        if (!LATEST_FOLDER) {
            loggingUtility.logMessage('error', 'Unable to determine the latest folder for screenshots.');
            return;
        }

        const SCENARIO_FOLDER = path.join(LATEST_FOLDER, scenario);
        const TEST_CASE_FOLDER = path.join(SCENARIO_FOLDER, testCase);

        fs.mkdirSync(SCENARIO_FOLDER, { recursive: true });
        fs.mkdirSync(TEST_CASE_FOLDER, { recursive: true });

        const SCREENSHOT_FILE_NAME = `${iteration ? `iteration_${iteration}_` : ''}${format(new Date(), 'yyyy-MM-dd_HH-mm-ss-SSS')}.png`;
        const SCREENSHOT_PATH = path.join(TEST_CASE_FOLDER, SCREENSHOT_FILE_NAME);

        try {
            await page.screenshot({ path: SCREENSHOT_PATH });
            loggingUtility.logMessage('info', `Screenshot saved at: ${SCREENSHOT_PATH}`);
        } catch (error) {
            loggingUtility.logMessage('error', `Error capturing screenshot`);
        }
    }
}

export default ScreenshotUtil;

