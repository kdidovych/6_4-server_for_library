const {LOG_DIR, LOG_FILE} = require('../constants');
const fs = require('fs');
const path = require('path');
const logDir = path.resolve(__dirname, '../..', LOG_DIR);
const logFilePath = path.resolve(logDir, LOG_FILE);

module.exports = class Logger {
    static log(error) {
        const timestamp = new Date().toISOString();
        let errorMessage;
        if (error instanceof Error) {
            errorMessage = error.stack;
            if (error.cause) {
                errorMessage += '\nCause:' + error.cause.stack;
            }
        } else {
            errorMessage = error;
        }
        const logMessage = `[${timestamp}]\n${errorMessage}\n\n`;
        fs.appendFile(logFilePath, logMessage, 'utf8', (err) => {
            if (err) {
                console.log(`Cannot log error: ${error.message}. NEW Error: ${err.message}`);
            }
        });
    }
}