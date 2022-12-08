const mongoose = require("mongoose");
const User = require("./UserModel");



//function add to cart
async function addToCart(username, cartItem) {
    try {
        const itemExisting = await User.findOne({ username: username, "cart._id": cartItem._id })
        if (itemExisting) { //if the item already exists : increase the qty by 1
            await User.findOneAndUpdate({ username: username, "cart._id": cartItem._id }, { $inc: { "cart.$.qty": 1 } });
        }

        else { //push new item
            await User.findOneAndUpdate({ username: username }, { $push: { cart: cartItem } });
        }

    }
    catch (error) {
        throw Error(error);
    }
}

//function to update cart item qty
async function updateCartItemQty(username, cartItemId, newQty) {
    try {
        await User.findOneAndUpdate({ username: username, "cart._id": cartItemId }, { $set: { "cart.$.qty": newQty } });
    }
    catch (error) {
        throw Error(error);
    }
}

//function to delete from cart
async function deleteFromCart(username, cartItemId) {
   

    try {
        await User.findOneAndUpdate({ username: username }, { $pull: { cart: { _id: cartItemId } } })
    }
    catch (err) {
        throw Error(err);
    }
}

//function to delete all items from cart
async function deleteAllFromCart(username) {
    try {
        await User.findOneAndUpdate({username : username}, {$set : { cart : [] }});
    }
    catch(err) {
        throw Error(err);
    }
}

//function to retrieve from cart
async function getCart(username) {
    try {
        let result = await User.findOne({ username: username });
        let cart = result.cart;
        return cart;
    }
    catch (err) {
        throw Error(err);
    }
}

//export
module.exports = {
    addToCart: addToCart,
    updateCartItemQty: updateCartItemQty,
    deleteFromCart: deleteFromCart,
    getCart: getCart,
    deleteAllFromCart : deleteAllFromCart
}