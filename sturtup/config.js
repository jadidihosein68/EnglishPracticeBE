const config = require('config');
require('dotenv').config();

module.exports=function(){
    if (!process.env.jwtPrivateKey) {
       throw new Error("fatal, jwtPrivateKey is not defined !");
    } 
}
