const mongoose = require("mongoose");

//defining pizzaSchema
const pizzaSchema = mongoose.Schema({
    type: String,
    image: String,
    name: String,
    description: String,
    prices: {
        Regular: Number,
        Medium: Number,
        Large: Number
    }
});

//make model 
const Pizza = mongoose.model("Pizza", pizzaSchema);

//get all pizzas from DB
async function getPizzas(){
    try{
        let allPizzas = await Pizza.find().exec();
        return allPizzas;
    }
    catch (error){
        throw Error(error);
    }
}

//export 
module.exports = {
    getPizzas : getPizzas
}