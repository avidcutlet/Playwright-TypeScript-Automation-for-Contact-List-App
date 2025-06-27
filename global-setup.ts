import fs from 'fs';
import path from 'path';

import { format } from 'date-fns';

import { LoggingUtility } from '@utils/logger-util';
import { EXCEPTION_API_MESSAGE } from '@utils/exception-messages-util';

const loggingUtil: LoggingUtility = new LoggingUtility();
const screenshotBasePath: string = path.join(process.cwd(), 'reports', 'screenshots');

// Setup screenshot folder
export default async (): Promise<void> => {
    try {
        if (!fs.existsSync(screenshotBasePath)) {
            console.log(`Creating base directory: ${screenshotBasePath}`);
            fs.mkdirSync(screenshotBasePath, { recursive: true });
        }

        const dateFolder: string = format(new Date(), 'yyyy-MM-dd_HH-mm-ss'); 
        const executionFolder: string = path.join(screenshotBasePath, dateFolder);

        if (!fs.existsSync(executionFolder)) {
            console.log(`Creating execution folder: ${executionFolder}`);
            fs.mkdirSync(executionFolder, { recursive: true });
        }
        process.env.EXECUTION_FOLDER = executionFolder;
    } catch (error) {
        loggingUtil.logMessage("error", EXCEPTION_API_MESSAGE(error as Error));
        throw error;
    }
};