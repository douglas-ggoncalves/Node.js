var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
const axios = require('axios')
var bodyParser = require('body-parser')
var router = require("./routes/routes")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/",router);

app.listen(4000, function(err){
    console.log("logamos")
})