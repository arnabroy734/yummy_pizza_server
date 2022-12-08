const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    req.logout((err) => {
        if (!err) {
            res.status(200).send("Logged out");
        }
        else {
            res.status(401).send("Not successful");
        }
    })
});

module.exports = router;