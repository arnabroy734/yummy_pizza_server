const express = require("express");
const router = express.Router();
const { loginUser } = require("../auth/login");

//Login existing user
router.post("/", (req, res) => {
    loginUser(req, res);
});

module.exports = router
