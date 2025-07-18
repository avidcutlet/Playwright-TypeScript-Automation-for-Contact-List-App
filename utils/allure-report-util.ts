import fs from 'fs';
import os from 'os';
import path from 'path';
import fsExtra from 'fs-extra';

import { test, Page } from '@playwright/test';

// Setup Allure Screenshot
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

          if (fs.existsSync(TEMP_FILE_PATH)) {
            // Attach the screenshot
            const screenshot = fs.readFileSync(TEMP_FILE_PATH);
            test.info().attach(stepName, { body: screenshot, contentType: 'image/png' });

            // Delete the temporary file
            await fsExtra.remove(TEMP_FILE_PATH);  // .remove For - Error: EPERM: operation not permitted
          } else {
            console.warn(`⚠️ Screenshot not found at ${TEMP_FILE_PATH}`);
          }
        } else {
          // Convert data to a string if it's an object
          const RESPONSE_STRING = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;
          
          // Attach the data
          test.info().attach(`${stepName} Data`, { body: RESPONSE_STRING, contentType: 'application/json' });
        }
      } catch (error) {
        const TEMP_FILE_PATH = path.join(os.tmpdir(), `${stepName}-failure.png`);
        await page.screenshot({ path: TEMP_FILE_PATH });
        
        const screenshot = fs.readFileSync(TEMP_FILE_PATH);
        test.info().attach(`${stepName} Failure Screenshot`, { body: screenshot, contentType: 'image/png' });
        
        await fsExtra.remove(TEMP_FILE_PATH);  // .remove For - Error: EPERM: operation not permitted
        throw error;
      }
    });
  }
}

export default AllureAttachScreenshot;
