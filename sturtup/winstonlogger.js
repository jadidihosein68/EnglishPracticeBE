const winston= require('winston');
require('winston-mongodb');
const config = require('config');
require('dotenv').config();


module.exports = winston.createLogger({
    transports: [
        new winston.transports.Console({level: 'error'})
        ,new winston.transports.MongoDB({
            db:process.env.db,
            level: 'error',
            option : { useUnifiedTopology: true }
        })
        ,new winston.transports.File({filename:'logfile.log'}) 
    ]
});