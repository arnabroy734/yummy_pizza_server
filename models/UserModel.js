const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


// cart sub schema
const cartSchema = mongoose.Schema({
    _id: String,
    name: String,
    image: String,
    size: String,
    price: Number, 
    qty: Number
});

//User Schema
const userSchema = mongoose.Schema({
    username : {type: String, required: true, unique: true}, //this is email
    name : {type: String, required: true},
    cart : [cartSchema],
    auth : {type : String, default : "customer"}
});

userSchema.plugin(passportLocalMongoose);

//User model
const User = mongoose.model("User", userSchema);


//exports
module.exports =  User