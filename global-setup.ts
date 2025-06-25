import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

const screenshotBasePath: string = path.join(process.cwd(), 'reports', 'screenshots');

export default async (): Promise<void> => {
    try {
        console.log(`Base Path: ${screenshotBasePath}`);

        // Ensure the base screenshot directory exists
        if (!fs.existsSync(screenshotBasePath)) {
            console.log(`Creating base directory: ${screenshotBasePath}`);
            fs.mkdirSync(screenshotBasePath, { recursive: true });
        }

        // Initialize the folder for the current execution
        const dateFolder: string = format(new Date(), 'yyyy-MM-dd_HH-mm-ss'); // Simpler format without special characters
        const executionFolder: string = path.join(screenshotBasePath, dateFolder);

        console.log(`Execution Folder: ${executionFolder}`);

        if (!fs.existsSync(executionFolder)) {
            console.log(`Creating execution folder: ${executionFolder}`);
            fs.mkdirSync(executionFolder, { recursive: true });
        }

        // Store the execution folder in an environment variable
        process.env.EXECUTION_FOLDER = executionFolder;
        console.log(`Execution folder set in environment: ${process.env.EXECUTION_FOLDER}`);
    } catch (error) {
        console.error(`Error during folder creation`);
    }
};