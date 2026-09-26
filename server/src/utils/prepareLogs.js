const { mkdirSync } = require('fs');
const path = require('path');
const {LOG_DIR} = require('../constants');
const logsFolderPath = path.resolve(__dirname, '../../', LOG_DIR);

module.exports = () => {
    try {
        mkdirSync(logsFolderPath, { recursive: true });
    } catch (error) {
        console.error(`Error. Cannot create logs directory: ${logsFolderPath}`, error.message);
    }
}