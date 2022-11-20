// IMPORTING MODEULES
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const model = require("./models/model.js");


//CREATING APP
const app = express();

// Allow App to Receive JSON data
app.use(express.json({ limit: "100mb" }));

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

//connect to database
model.connectToDB()
    .then(() => {
        app.emit("ready-to-listen");
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.error(`${err} : Connection to database failed`);
    });


//Configure routers
//Route : "/pizzas"
const pizzasRouter = require("./routers/Pizzas.js");
app.use("/pizzas", pizzasRouter);

//Route : "/cart"
const cartRouter = require("./routers/Cart.js");
app.use("/cart", cartRouter);

//Route : "/order"
const orderRouter = require("./routers/Order");
app.use("/order", orderRouter)



//Starting the app
app.on("ready-to-listen", () => {
    app.listen(process.env.PORT || 4000, () => {
        console.log("Server is running");
    });
})
