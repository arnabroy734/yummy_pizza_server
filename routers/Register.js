const express = require("express");
const { loginUser } = require("../auth/login");
const { registerUser } = require("../auth/register");
const router = express.Router();

//register new user
router.post("/", registerUser, (req, res) => {
    // login user if registration is successful
    loginUser(req, res);
});
       


module.exports = router