const winston= require('winston');
require('winston-mongodb');
const config = require('config');

module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console({level: 'error'})
        ,new winston.transports.MongoDB({
            db:config.get("db"),
            level: 'error',
            option : { useUnifiedTopology: true }
        })
        ,new winston.transports.File({filename:'logfile.log'})
    ]
});