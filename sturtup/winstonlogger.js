const winston= require('winston');
require('winston-mongodb');

module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console({level: 'error'})
        ,new winston.transports.MongoDB({
            db:'mongodb://127.0.0.1:27017/tdb',
            level: 'error',
            option : { useUnifiedTopology: true }
        })
        ,new winston.transports.File({filename:'logfile.log'})
    ]
});