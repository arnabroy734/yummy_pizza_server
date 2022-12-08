const express = require("express");
const { authenticateUser } = require("../auth/auth");
const { addToCart, updateCartItemQty, deleteFromCart, getCart, deleteAllFromCart } = require("../models/CartSubModel");
const router = express.Router();

// add new cart item
router.post("/", authenticateUser, (req, res) => {
    let cartItem = req.body;
    addToCart(req.user.username, cartItem)
        .then(() => {
            res.send({ status: "successful" });
        }).catch((err) => {
            res.status(500).send({ status: "failed" });
        });
});

//update existing cart item
router.patch("/", authenticateUser, (req, res) => {
    let cartItemId = req.body.id;
    let qty = req.body.qty;

    updateCartItemQty(req.user.username, cartItemId, qty)
        .then(() => {
            res.send({ status: "successful" });
        })
        .catch((err) => {
            res.status(500).send({ status: "failed" });
        });
});

//delete cart item
router.delete("/", authenticateUser, (req, res) => {

    let cartItemId = req.body.id;
    deleteFromCart(req.user.username, cartItemId)
        .then(() => {
            res.send({ status: "successful" });
        }).catch((err) => {
            res.status(500).send({ status: "failed" });
        });
});

//delete all cart items
router.delete("/all", authenticateUser, (req, res) => {
    deleteAllFromCart(req.user.username)
        .then(() => {
            res.status(200).send({status : "successful"});
        })
        .catch((err) => {
            res.status(500).send({ status: "failed" });
        });
})

//get all cartitems
router.get("/", authenticateUser, (req, res) => {
    getCart(req.user.username)
        .then((cart) => {
            res.send(cart);
        }).catch((err) => {
            res.status(500).send([]);
        });
});

module.exports = router