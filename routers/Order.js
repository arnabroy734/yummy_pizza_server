const express = require("express");
const { placeOrder, updateOrder, getOrder } = require("../models/OrderSubModel");
const router = express.Router();

router.post("/", (req, res) => {
    let order = req.body;
    order.orderTime = new Date(order.orderTime);

    placeOrder(order)
        .then((orderId) => {
            res.send(orderId);
        }).catch((err => {
            res.send("");
        }));

});

router.patch("/", (req, res) => {
    let orderId = req.body.id;
    let status = req.body.status;

    updateOrder(orderId, status)
        .then(() => {
            res.send("Order status updated");
        })
        .catch((err) => {
            res.send("Status update failed");
        })
});

router.get("/", (req, res) => {
    getOrder()
        .then((orders) => {
            console.log(orders);
            res.send(orders);
        })
        .catch((err) => {
            res.send(err);
        })
})

module.exports = router;