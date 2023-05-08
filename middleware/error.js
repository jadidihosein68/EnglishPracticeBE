const winstonlogger= require('../sturtup/winstonlogger');
module.exports= function(err,req,res,next){
    winstonlogger.error(err.message, err);
    // log exception
    res.status(500).send(err.message);   
}