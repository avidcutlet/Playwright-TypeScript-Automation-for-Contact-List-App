import fs from 'fs';
import os from 'os';
import path from 'path';

import { test, Page } from '@playwright/test';

class AllureAttachScreenshot {
    async withAllureStep(
        page: Page,
        stepName: string,
        action: () => Promise<void>,
        data: any = null
    ): Promise<void> {
        await test.step(stepName, async () => {
            try {
                // Perform the action
                await action();

                if (data === null) {
                    // Generate a temporary path for the screenshot
                    const TEMP_FILE_PATH = path.join(os.tmpdir(), `${stepName}.png`);

                    // Capture and save the screenshot
                    await page.screenshot({ path: TEMP_FILE_PATH });

                    // Attach the screenshot
                    const screenshot = fs.readFileSync(TEMP_FILE_PATH);
                    test.info().attach(stepName, { body: screenshot, contentType: 'image/png' });

                    // Delete the temporary file
                    await fs.promises.unlink(TEMP_FILE_PATH);
                } else {
                    // Convert data to a string if it's an object
                    const RESPONSE_STRING = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;

                    // Attach the data
                    test.info().attach(`${stepName} Data`, { body: RESPONSE_STRING, contentType: 'application/json' });
                }
            } catch (error) {
                // On failure, take a screenshot and attach it
                const TEMP_FILE_PATH = path.join(os.tmpdir(), `${stepName}-failure.png`);
                await page.screenshot({ path: TEMP_FILE_PATH });

                const screenshot = fs.readFileSync(TEMP_FILE_PATH);
                test.info().attach(`${stepName} Failure Screenshot`, { body: screenshot, contentType: 'image/png' });

                // Delete the temporary file
                await fs.promises.unlink(TEMP_FILE_PATH);

                // Rethrow the error to let Playwright handle it
                throw error;
            }
        });
    }
}

export default AllureAttachScreenshot;
