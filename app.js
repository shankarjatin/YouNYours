const express = require("express");
const homeRouter = require("./routers/homeRouter");
require('dotenv').config()
const app = express()
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000 ;
const DB = "mongodb+srv://shankarjatin:jaiHanumanji@cluster0.b1no4tl.mongodb.net/youAndyours?retryWrites=true&w=majority";
app.set("view engine","ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.set(`strictQuery`,true);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successful");
}).catch((err) => console.log(err) );



app.get("/",(req,res)=>{
    res.render("pages/index")
})
app.use(homeRouter);





app.listen(port,()=>{
    console.log("server is live")
})