const mongoose = require("mongoose");
const User = require("./UserModel");

//function to place order
async function placeOrder(order) {
    try {
        let updated = await User.findOneAndUpdate({username : "arnabroy"}, {$push : {orders : order}}, {new : true});
        let orderId = updated.orders[updated.orders.length - 1 ]._id;
        return orderId;
    }
    catch(err) {
        throw Error(err);
    }
}

//function to update order
async function updateOrder(orderId, status) {
    try {
        let result = await User.findOneAndUpdate({username : "arnabroy", "orders._id" : orderId}, {$set : {"orders.$.status" : status}});
    }
    catch (err) {
        throw Error(err);
    }
}

//function to retrieve orders 
async function getOrder() {
    try {
        let result = await User.findOne({username : "arnabroy"});
        let orders = result.orders;
        return orders;
    }
    catch (err) {
        throw Error(err);
    }
}

//exports
module.exports = {
    placeOrder : placeOrder,
    updateOrder : updateOrder,
    getOrder : getOrder
}