const config = require('config');
const mongoose = require('mongoose');
require('dotenv').config();


module.exports = function () {
  mongoose
    .connect(process.env.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to mongo DB');
    })
    .catch((err) => console.log(err.message));
};

