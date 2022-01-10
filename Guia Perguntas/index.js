const express = require("express");
const app = express();
const database = require("./database/database");
const Question = require("./database/question");
const bodyParser = require("body-parser");
var slugify = require('slugify')

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

database.authenticate().then(
    console.log("Conexão com o banco de dados bem sucedida")
).catch(err => {
    console.log(err)
})

app.get("/", function (req, res) {
    Question.findAll({
    }).then(questions => {
        res.render("index", {questions: questions})
        //res.send(question)
    }
    ).catch(err => {
        res.send('Erro ' + err)
    })
});

app.get("/perguntar", function (req, res) {
    res.render("createQuestion");
});

app.post("/perguntar", function (req, res) {
    var title = req.body.title;
    var desc = req.body.desc;
    var slug = slugify(title+desc)

    /*Question.create({
        titulo: title,
        descricao: desc
    })*/

    //res.redirect('/')
    res.send(slug)
})


app.listen(8081, function () {
    console.log("app rodando");
})