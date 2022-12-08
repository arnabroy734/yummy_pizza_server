const express = require("express");
const { getPizzas } = require("../models/PizzaModel");
const PizzaModel = require("../models/PizzaModel");
const router = express.Router();

router.get("/", (req, res) => {

    //authenticate request
    if (req.isAuthenticated()) {
        console.log("Authentic - " + req.user);
    }
    else {
        console.log("Not authentic");
    }

    getPizzas()
        .then((allPizzas) => {
            res.send(allPizzas);
        })
        .catch((err) => {
            res.status(500).send([]);//send empty list if error occurs
        })
});

//export
module.exports = router