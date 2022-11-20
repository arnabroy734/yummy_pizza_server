const mongoose = require("mongoose");
const User = require("./UserModel");



//function add to cart
async function addToCart(cartItem) {
    try {
        await User.findOneAndUpdate({username : "arnabroy"}, {$push : {cart: cartItem}});
        return true;
    }
    catch(error){
        throw Error(error);
    }
}

//function to update cart item qty
async function updateCartItemQty(cartItemId, newQty) {
    try{
        await User.findOneAndUpdate({username : "arnabroy", "cart._id" : cartItemId}, {$set : {"cart.$.qty" : newQty}});
    }
    catch(error) {
        throw Error(error);
    }
}

//function to delete from cart
async function deleteFromCart(cartItemId) {
    try {
        await User.findOneAndUpdate({username : "arnabroy"}, {$pull : {cart : {_id : cartItemId}}})
    }
    catch(err) {
        throw Error(err);
    }
}

//function to retrieve from cart
async function getCart() {
    try {
        let result = await User.findOne ({username : "arnabroy"});
        let cart = result.cart;
        return cart; 
    }
    catch (err) {
        throw Error(err);
    }
}

//export
module.exports = {
    addToCart : addToCart, 
    updateCartItemQty : updateCartItemQty,
    deleteFromCart : deleteFromCart,
    getCart : getCart
}