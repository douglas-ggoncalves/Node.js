var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const Admin = require("./admin/Admin");
const Article = require("./article/Article");


app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.json());

app.get("/", (req, res) => {   
    res.render("index")
})

app.listen(8081, err => {
    if(err) {
        console.log("Ocorreu um erro " +err)
    } else{
        console.log("Conexão bem sucedida")
    }
})