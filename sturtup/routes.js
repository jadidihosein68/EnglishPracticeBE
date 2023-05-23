
const express = require('express');
var cors = require('cors')

const auth = require('../routes/auth');
const plan = require('../routes/productplan');
const flashcard = require('../routes/flashcard');
const flashcardSet = require('../routes/flashcardSet');
const tutor = require('../routes/tutor');
const session = require('../routes/session');
const subscription = require('../routes/subscription');
const user = require('../routes/user');


module.exports=function(app){

    app.use(express.json());
    app.use(cors());
    app.use('/api/productplan',plan);
    app.use('/api/getvocabulary',flashcard);
    app.use('/api/flashcard',flashcard);
    app.use('/api/auth/LoginWithGoogle',auth);
    app.use('/api/flashcardSet',flashcardSet);
    app.use('/api/tutor',tutor);
    app.use('/api/session',session);
    app.use('/api/subscription',subscription);
    app.use('/api/auth/LoginWithGoogle',auth);
    app.use('/api/user',user);
    

}