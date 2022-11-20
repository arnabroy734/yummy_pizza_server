const mongoose = require("mongoose");

// cart sub schema
const cartSchema = mongoose.Schema({
    _id: String,
    name: String,
    image: String,
    size: String,
    price: Number, 
    qty: Number
});

//Order sub-schema
const orderSchema = mongoose.Schema({
    orderTime : Date,
    phone : String, 
    address : String,
    orderPrice : Number,
    totalItems : Number,
    orderItems : [cartSchema], 
    orderStatus : Number
});

//User Schema
const userSchema = mongoose.Schema({
    username : String,
    cart : [cartSchema],
    orders : [orderSchema]
});

//User model
const User = mongoose.model("User", userSchema);

//exports
module.exports = User