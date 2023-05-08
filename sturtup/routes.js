
const express = require('express');
var cors = require('cors')

const auth = require('../routes/auth');
const plan = require('../routes/productplan');
const flashcard = require('../routes/flashcard');


module.exports=function(app){

    app.use(express.json());
    app.use(cors());
    app.use('/api/productplan',plan);
    app.use('/api/getvocabulary',flashcard);
    app.use('/api/auth/LoginWithGoogle',auth);
    

}