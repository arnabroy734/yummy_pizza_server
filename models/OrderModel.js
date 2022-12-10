const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//Define OrderItem Schema
const orderItemSchema = mongoose.Schema({
    _id: String,
    name: String,
    image: String,
    size: String,
    price: Number, 
    qty: Number
});


//define OrderSchema
const orderSchema = mongoose.Schema({
    
    email : {type: String, required : true},
    orderTime : Date,
    phone : String, 
    address : String,
    orderPrice : Number,
    totalItems : Number,
    orderItems : [orderItemSchema], 
    orderStatus : Number
});

orderItemSchema.plugin(passportLocalMongoose);

//Making model
const Order = mongoose.model("Order",orderSchema);

async function placeOrder (order) {
    try {
        const orderToPlace = new Order( {...order} );
        const placedorder = await orderToPlace.save();
        return orderToPlace._id;
    }
    catch (err) {
        console.log(err);
        throw Error(err);
    }
}

async function updateOrder(orderId, status) {
    try {
        await Order.findOneAndUpdate({_id : orderId}, {$set : {orderStatus : status}});
    }
    catch(err) {
        throw Error(err);
    }
}

async function getAllOrdersOpen() {
    try {
        let orders = await Order.find({orderStatus : {$lt : 4}});
        return orders;
    }
    catch(err) {
        throw Error(err);
    }
}

async function getAllOrdersClose(offset, limit) {
    try {
        let orders = await Order.find({orderStatus : {$eq : 4}}).skip(offset).limit(limit);
        return orders;
    }
    catch(err) {
        throw Error(err);
    }
}

async function getByOrderId(orderId) {
    try {
        let order = await Order.findById(orderId);
        return order;
    }
    catch(err) {
        throw Error(err);
    }

}

async function getByUsernameOpen( username) {
    try {
        let orders = await Order.find({email : username, orderStatus : {$lt : 4} });
        return orders;
    }
    catch(err) {
        throw Error(err);
    }   

}

async function getByUsernameClose( username) {
    try {
        let orders = await Order.find({email : username, orderStatus : {$eq : 4} });
        return orders;
    }
    catch(err) {
        throw Error(err);
    }   

}

module.exports =  { Order , placeOrder, 
    updateOrder, getAllOrdersOpen,getByOrderId,  
    getByUsernameOpen, getByUsernameClose, getAllOrdersClose}