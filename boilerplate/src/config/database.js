const { Model } = require('objection');
const Knex      = require('knex');
const config    = require('./knexconfig');
const { log }   = require('./vars');

const knex = Knex(config);

Model.knex(knex);

if (log === 'true') {
    const fs = require('fs');

    let timer, query;

    knex.on('query', function(queryData) {
        query = queryData.sql;
        timer = Date.now();
        for (let i in queryData.bindings) {
            query = query.replace('?', `'${queryData.bindings[i]}'`);
        }
    }).on('query-response', function() {
        fs.writeFile('./src/logs/query.log', `${query} : ${Date.now() - timer}ms\r\n`, { flag: 'a+' }, e => {
            if (e) {
                console.error(e);
            }
        })
    });
}
