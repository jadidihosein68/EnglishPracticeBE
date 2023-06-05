require('express-async-errors');
const winstonlogger= require('./sturtup/winstonlogger');
const DebugMessage = require('debug')('app:startup');
const express = require('express');
const app = express();

require('./sturtup/config')();
require('./sturtup/prod')(app);
require('./sturtup/routes')(app);
require('./sturtup/db')();

process.on('uncaughtException', (ex)=>{ // capture un handeled exception on the scope out of express
  winstonlogger.error(ex.message,ex);
});

process.on('unhandledRejection', (ex)=>{ // capture un handeled exception on the scope out of express
  winstonlogger.error(ex.message,ex);
});

//////////////////
app.get('/api/ping', (req, res) => { // test api 
  res.send("I am alive");
});

//////////////////

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

 // endpoint http://localhost:3000/getvocabulary