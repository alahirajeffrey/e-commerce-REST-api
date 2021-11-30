const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");

const port = process.env.PORT || 5000

const app = express();

//setup database
mongoose.connect(process.env.MONGO_URL_LOCAL)
    .then(()=>{
        console.log("DB connection successful")
    }).catch((err)=>{
        console.log(err)
    });

//configure express app
app.use(cors())
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

//setup server
app.listen(port, ()=>{
    console.log(`Backend server is running on port ${port}`)
});