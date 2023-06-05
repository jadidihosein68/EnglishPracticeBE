const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv').config();



module.exports = function (req, res, next) {  // a middle ware to do something and pass to next function 
   
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send("No token provided !")

    try {
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid Token !');
    }

}
