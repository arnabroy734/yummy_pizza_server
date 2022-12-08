const express = require("express");
const { authenticateUser } = require("../auth/auth");
const { placeOrder, updateOrder, getAllOrders, getByOrderId, getByUsernameOpen, getByUsernameClose } = require("../models/OrderModel");
const router = express.Router();

router.post("/", authenticateUser, (req, res) => {
    let order = req.body;
    order.orderTime = new Date(order.orderTime);
    order = {...order, email : req.user.username};


    placeOrder(order)
        .then((orderId) => {
            res.status(200).send(orderId);
        }).catch((err => {
            console.log(err);
            res.status(500).send({ errMessage: "Something went wrong" });
        }));

});

router.patch("/", (req, res) => {
    let orderId = req.body.id;
    let status = req.body.status;

    updateOrder(orderId, status)
        .then(() => {
            res.send({ message: "Order status updated" });
        })
        .catch((err) => {
            res.status(500).send({ errMessage: "Something went wrong" });
        })
});

router.get("/all", (req, res) => {

    getAllOrders()
        .then((orders) => {
            console.log(orders);
            res.status(200).send(orders);
        })
        .catch((err) => {
            res.status(500).send([]);
        })
})

router.get("/id/:orderId", (req, res) => {
    let orderId = req.params.orderId;

    getByOrderId(orderId)
        .then((order) => {
            res.send(order);
        })
        .catch((err) => {
            res.status(500).send(null);
        });
})

router.get("/user/open",  authenticateUser, (req, res) => {
    
    getByUsernameOpen(req.user.username)
        .then((orders) => {
            res.status(200).send(orders);
        })
        .catch((err) => {
            res.status(500).send([]);
        })

})

router.get("/user/close",  authenticateUser, (req, res) => {
    
    getByUsernameClose(req.user.username)
        .then((orders) => {
            res.status(200).send(orders);
        })
        .catch((err) => {
            res.status(500).send([]);
        })

})

module.exports = router;