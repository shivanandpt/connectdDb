const conf = require('./server/conf');
const initializeDatabases = require('./server/db')
(process.env.DB_TYPE, conf.get("dbs"));
const express = require('express')
const app = express();
const routes = require('./server/routes');

initializeDatabases.then(dbs => {
    console.log(process.env.DB_TYPE + " Connected !!!");
    routes(app, dbs)
    .listen(conf.get("port"), () => console.log('Listening on port ' +
    conf.get("port")))
})
.catch(err => {
    console.error('Failed to make all database connections!')
    console.error(err)
    process.exit(1)
});