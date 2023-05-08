require('express-async-errors');
const winstonlogger= require('./sturtup/winstonlogger');
const DebugMessage = require('debug')('app:startup');

const dotenv = require('dotenv');
const express = require('express');
const Auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envFile });
const app = express();

require('./sturtup/routes')(app);
require('./sturtup/db')();
require('./sturtup/config')();




process.on('uncaughtException', (ex)=>{ // capture un handeled exception on the scope out of express
  winstonlogger.error(ex.message,ex);
});


process.on('unhandledRejection', (ex)=>{ // capture un handeled exception on the scope out of express
  winstonlogger.error(ex.message,ex);
});




const allowedOrigins = [process.env.ALLOWED_ORIGIN];




//////////////////
app.get('/api/ping', (req, res) => { // test api 
  res.send("I am alive");

});

//////////////////
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


 // endpoint http://localhost:3000/getvocabulary