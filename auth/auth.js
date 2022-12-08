const session = require("express-session");
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const User  = require("../models/UserModel");
const cookieParser = require("cookie-parser");

//Session configuration
function configureSession(app) {
    // 1. USE SESSION
    app.use(session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false

    }));

    app.use(cookieParser(process.env.SESSION_SECRET));

    //2. USE PASSPORT IN EXPRESS BASED APP
    app.use(passport.initialize());
    app.use(passport.session());

    // 4. Configure passportLocalMongoose
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

}

function authenticateUser(req, res, next) {
    if(req.isAuthenticated()){
        next();
    }
    else {
        res.status(401).send("unauthorised");
    }
    
}

module.exports = {
    configureSession : configureSession, 
    passport : passport,
    authenticateUser : authenticateUser
}