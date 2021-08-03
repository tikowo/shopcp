const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '../../.env')
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    log: process.env.LOG,
    jwtSecret: process.env.JWT_SECRET,
    db: {
        client: process.env.DB_CONNECTION,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        }
    },
};
