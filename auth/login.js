const  { passport } = require("./auth");
const User = require("../models/UserModel");

function loginUser(req, res) {

    const user = new User({
        username : req.body.username, 
        password : req.body.password
    })

    req.login(user, (err) => {
        if (!err) {
            passport.authenticate("local", {failureMessage : true})(req, res, ()=> {
                console.log("Login success");
                let loggedInUser = req.user;
                res.status(200).send({email : loggedInUser.username, name : loggedInUser.name});
            })
        }
    })
}

module.exports = {loginUser : loginUser}