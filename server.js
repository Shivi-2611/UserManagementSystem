const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser =require("body-parser")
const path = require("path");
const services=require("./server/services/render");
const connectDB = require("./server/database/connect.js");
//creating an instance of express app
const app =express();

//configuring environment variables
dotenv.config({path:"./config.env"});

//log requests
app.use(morgan("tiny"));

//mongodb connection
connectDB();

//parse requests to body parser
app.use(bodyparser.urlencoded({extended:true}))

//setting view engine
//app.set("views",path.resolve(__dirname,"views/ejs"); //this we set if we dont specify ejs files in views folder
app.set("view engine","ejs");

//loading assests
app.use('/assets',express.static(path.resolve(__dirname,"assets")))
const PORT= process.env.PORT;

//loading routes
app.use('/',require('./server/routes/router.js'))


app.listen(PORT,()=>{
    console.log(`hey i am using PORT ${PORT}`);
});