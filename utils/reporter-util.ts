import { Page } from '@playwright/test';
import { LoggingUtility } from '@utils/logger-util';
import ScreenshotUtil from '@utils/screenshot-util';


const loggingUtility = new LoggingUtility();

// Setup up reporter util
class ReporterUtil {
    static async report(page: Page, logMessage: string, logLevel: 'info' | 'error' | 'debug' | 'warn' | 'critical'): Promise<void> {
        if (logLevel === "info") {
            loggingUtility.logMessage(logLevel, logMessage);
            await ScreenshotUtil.takeScreenshot(page, DESCRIBE_NAME, TEST_NAME, '', process.env.SAVE_SCREENSHOT);
        } else {
            loggingUtility.logMessage(logLevel, logMessage);
            await ScreenshotUtil.takeScreenshot(page, DESCRIBE_NAME, TEST_NAME, '', process.env.SAVE_SCREENSHOT);
        }
    }
}

export default ReporterUtil;
