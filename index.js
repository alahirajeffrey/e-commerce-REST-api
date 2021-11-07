const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

//setup database
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("DB connection successful")
    }).catch((err)=>{
        console.log(err)
    });

//setup server
app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running")
});