// IMPORTING MODEULES
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const model = require("./models/model.js");
const cors = require("cors");
const {configureSession} = require("./auth/auth");
const https = require('https');
const fs = require('fs');



//CREATING APP
const app = express();
// app.use(cors({origin : "http://localhost:3000", credentials : true, methods : "GET, POST, PATCH, PUT, DELETE"}));
app.use(cors());

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


//configure authorisation
configureSession(app);

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

//Route : "/register"
const registerRouter = require("./routers/Register");
app.use("/register", registerRouter);

//Route: "/login"
const loginRouter = require("./routers/Login");
app.use("/login", loginRouter);

//Route : "/user"
const getUseRouter = require("./routers/GetUser");
app.use("/user", getUseRouter);

//Route : "/logout"
const logoutUser = require("./routers/Logout");
app.use("/logout", logoutUser);



//Starting the app
app.on("ready-to-listen", () => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is running ${process.env.PORT || 4000}`);
    });
})
