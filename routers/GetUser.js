const express = require("express");
const { authenticateUser } = require("../auth/auth");
const router = express.Router();

router.get("/", authenticateUser, (req, res) => {
    const userinfo = {
        email : req.user.username,
        name : req.user.name
    }
    res.send(userinfo);
});

module.exports = router;