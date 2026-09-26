const { Client } = require('pg');

module.exports.client = () => {
    return new Client({
        user: process.env.DB_PG_USER,
        password: process.env.DB_PG_PWD,
        host: process.env.DB_PG_HOST,
        port: process.env.DB_PG_PORT,
        database: process.env.DB_PG_NAME,
    });
};