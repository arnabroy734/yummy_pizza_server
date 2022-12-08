const User = require("../models/UserModel");

//middlewire to register user
function registerUser(req, res, next) {    

    const { username, name, password } = req.body;

    User.register({ username: username, name: name }, password, function (err, user) {

        if (err) {
            if (err.name == "UserExistsError") {
                res.status(500).send({errMessage : "E-mail id already exists"});
            }
            else {
                console.log(err);
                res.status(500).send({errMessage : "Something went wrong"});
            }
        }

        else {
            next();//registration successful
        }
    });

}

module.exports = { registerUser: registerUser }