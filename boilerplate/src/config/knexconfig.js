const { db } = require('./vars');

module.exports = {
    ...db,
    migrations: {
        tableName: 'migrations',
        directory: '../database/migrations'
    },
    seeds: {
        directory: '../database/seeds'
    }
};

