const express = require("express");
const { getPizzas } = require("../models/PizzaModel");
const PizzaModel = require("../models/PizzaModel");
const router = express.Router();

router.get("/", (req, res) => {
    getPizzas()
        .then((allPizzas) => {
            res.send(allPizzas);
        })
        .catch((err) => {
            res.send([]);//send empty list if error occurs
        })
});

//export
module.exports = router