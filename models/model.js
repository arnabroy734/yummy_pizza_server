// Importing packages
const mongoose = require("mongoose");
require('dotenv').config();

// Connect to database
function connectToDB() {
    //connect to mongodb atlas
    let uri = "mongodb+srv://" + process.env.ATLAS_UID + ":" + process.env.ATLAS_PASS + "@cluster0.oxanwkk.mongodb.net/pizzaDB?retryWrites=true&w=majority";
    return mongoose.connect(uri);
}

//exports
module.exports = {
    connectToDB: connectToDB
}