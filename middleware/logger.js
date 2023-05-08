function log(req, res, next) {  // a middle ware to do something and pass to next function 
    // console.log('logging ...');
        next()
    }
    module.exports = log;