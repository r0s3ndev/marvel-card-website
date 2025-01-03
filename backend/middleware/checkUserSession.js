exports.checkLoggedIn = (req, res, next) => {
    if(!req.session.sessionId){
        next();
    } else {
        console.log("user not logged");
    }
}