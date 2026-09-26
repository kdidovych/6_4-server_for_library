require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const PORT = process.env.SERVER_PORT || 5000;
const prepareLogs = require('./src/utils/prepareLogs');

prepareLogs();

http.createServer(app).listen(PORT, (e) => {
    if (e) {
        console.error("Failed to start server:", e);
    } else {
        console.log(`Server started on PORT=${PORT}`)
    }
});
