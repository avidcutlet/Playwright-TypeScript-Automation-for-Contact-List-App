import fs from 'fs';
import path from 'path';
import log from 'loglevel';
 
export class LoggingUtility {
    private logger: log.Logger;
    private fileStream: fs.WriteStream;
    
    constructor() {
        this.logger = log;
        this.logger.setLevel('debug');
        const LOG_FILE_PATH = this.initializeLogFile();
 
        // Initialize file logging
        this.fileStream = fs.createWriteStream(LOG_FILE_PATH, { flags: 'a' });
    }
 
    // Setup log file
    initializeLogFile() {
        const LOG_DIRECTORY = path.join(process.cwd(), 'log');
        if (!fs.existsSync(LOG_DIRECTORY)) {
            fs.mkdirSync(LOG_DIRECTORY, { recursive: true });
        }
 
        const CURRENT_DATE = new Date();
        const FORMATTED_DATE = CURRENT_DATE.toISOString().split('T')[0].replace(/-/g, '');
        const LOG_FILE_PATH = path.join(LOG_DIRECTORY, `${FORMATTED_DATE}_logs.txt`);
        return LOG_FILE_PATH;
    }
 
    // Setup log message
    logMessage(logLevel: 'debug' | 'info' | 'warn' | 'error' | 'critical', message: string) {
        const TIME_STAMP = new Date().toISOString();
        const LOG_LINE = `${TIME_STAMP} - ${logLevel.toUpperCase()} - ${message}\n`;
 
        // Write to the file
        this.fileStream.write(LOG_LINE);
 
        switch (logLevel) {
            case 'debug':
                this.logger.debug(LOG_LINE);
                break;
            case 'info':
                this.logger.info(LOG_LINE);
                break;
            case 'warn':
                this.logger.warn(LOG_LINE);
                break;
            case 'error':
                this.logger.error(LOG_LINE);
                break;
            case 'critical':
                this.logger.error(LOG_LINE);
                break;
            default:
                this.logger.info(LOG_LINE);
        }
    }
}
 
 