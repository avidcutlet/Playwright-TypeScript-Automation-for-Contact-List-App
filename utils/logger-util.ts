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
        const logDirectory = path.join(process.cwd(), 'log');
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory, { recursive: true });
        }
 
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, '');
        const logFilePath = path.join(logDirectory, `${formattedDate}_logs.txt`);
        return logFilePath;
    }
 
    // Setup log message
    logMessage(logLevel: 'debug' | 'info' | 'warn' | 'error' | 'critical', message: string) {
        const timeStamp = new Date().toISOString();
        const logLine = `${timeStamp} - ${logLevel.toUpperCase()} - ${message}\n`;
 
        // Write to the file
        this.fileStream.write(logLine);
 
        switch (logLevel) {
            case 'debug':
                this.logger.debug(logLine);
                break;
            case 'info':
                this.logger.info(logLine);
                break;
            case 'warn':
                this.logger.warn(logLine);
                break;
            case 'error':
                this.logger.error(logLine);
                break;
            case 'critical':
                this.logger.error(logLine);
                break;
            default:
                this.logger.info(logLine);
        }
    }
}
 
 