const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const port = process.env.PORT || 5000

const app = express();

//setup database
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("DB connection successful")
    }).catch((err)=>{
        console.log(err)
    });

//configure express app
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

//setup server
app.listen(port, ()=>{
    console.log(`Backend server is running on port ${port}`)
});