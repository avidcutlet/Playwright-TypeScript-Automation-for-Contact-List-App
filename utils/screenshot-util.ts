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

    // Setup latest folder
    static getLatestFolder(): string | null {
        try {
            // Ensure the base directory exists
            if (!fs.existsSync(this.screenshotBasePath)) {
                fs.mkdirSync(this.screenshotBasePath, { recursive: true });
            }
    
            const directoryContents = fs.readdirSync(this.screenshotBasePath, { withFileTypes: true });
    
            const folderDetails = directoryContents
                .filter(entry => entry.isDirectory())
                .map(folder => ({
                    folderName: folder.name,
                    modificationTime: fs.statSync(path.join(this.screenshotBasePath, folder.name)).mtime,
                }));
    
            folderDetails.sort((folderA, folderB) => folderB.modificationTime.getTime() - folderA.modificationTime.getTime());
    
            if (folderDetails.length > 0) {
                return path.join(this.screenshotBasePath, folderDetails[0].folderName);
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

        const latestFolder = this.getLatestFolder();
        if (!latestFolder) {
            loggingUtility.logMessage('error', 'Unable to determine the latest folder for screenshots.');
            return;
        }

        const scenarioFolder = path.join(latestFolder, scenario);
        const testCaseFolder = path.join(scenarioFolder, testCase);

        fs.mkdirSync(scenarioFolder, { recursive: true });
        fs.mkdirSync(testCaseFolder, { recursive: true });

        const screenshotFileName = `${iteration ? `iteration_${iteration}_` : ''}${format(new Date(), 'yyyy-MM-dd_HH-mm-ss-SSS')}.png`;
        const screenshotPath = path.join(testCaseFolder, screenshotFileName);

        try {
            await page.screenshot({ path: screenshotPath });
            loggingUtility.logMessage('info', `Screenshot saved at: ${screenshotPath}`);
        } catch (error) {
            loggingUtility.logMessage('error', `Error capturing screenshot`);
        }
    }
}

export default ScreenshotUtil;

