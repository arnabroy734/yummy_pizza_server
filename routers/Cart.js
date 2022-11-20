const express = require("express");
const { addToCart, updateCartItemQty, deleteFromCart, getCart } = require("../models/CartSubModel");
const router = express.Router();

// add new cart item
router.post("/", (req, res) => {
    let cartItem = req.body;
    addToCart(cartItem)
        .then(() => {
            res.send("successful");
        }).catch((err) => {
            res.send("failed");
        });
});

//update existing cart item
router.patch("/", (req, res) => {
    let cartItemId = req.body.id;
    let qty = req.body.qty;

    updateCartItemQty(cartItemId, qty)
        .then(() => {
            res.send("Patch success");
        })
        .catch((err) => {
            res.send("patch failed");
        });
});

//delete cart item
router.delete("/", (req, res) => {
    let cartItemId = req.body._id;
    deleteFromCart(cartItemId)
        .then(() => {
            res.send("deleted");
        }).catch((err) => {
            res.send(err + "Cannot be deleted");
        });
});

//get all cartitems
router.get("/", (req, res) => {
    getCart()
        .then((cart) => {
            res.send(cart);
        }).catch((err) => {
            res.send([]);
        });
});

module.exports = router