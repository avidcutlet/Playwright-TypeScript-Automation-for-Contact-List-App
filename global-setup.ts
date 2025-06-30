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
        // Ensure the base screenshot directory exists
        if (!fs.existsSync(screenshotBasePath)) {
            console.log(`Creating base directory: ${screenshotBasePath}`);
            fs.mkdirSync(screenshotBasePath, { recursive: true });
        }

        // Initialize the folder for the current execution
        const dateFolder: string = format(new Date(), 'yyyy-MM-dd_HH-mm-ss'); // Simpler format without special characters
        const executionFolder: string = path.join(screenshotBasePath, dateFolder);

        if (!fs.existsSync(executionFolder)) {
            console.log(`Creating execution folder: ${executionFolder}`);
            fs.mkdirSync(executionFolder, { recursive: true });
        }
        // Store the execution folder in an environment variable
        process.env.EXECUTION_FOLDER = executionFolder;
    } catch (error) {
        loggingUtil.logMessage("error", EXCEPTION_API_MESSAGE(error as Error));
        throw error;
    }
};