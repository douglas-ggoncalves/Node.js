const express = require("express");
const app = express();
const database = require("./database/database");
const Question = require("./database/question");
const Answer = require("./database/answer");
const bodyParser = require("body-parser");
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

    Question.create({
        titulo: title,
        descricao: desc
    }).then(() => {
        res.redirect('/');
    }).catch(err => {
        res.send('Erro '+err );
    })
});

app.get("/questao/:id", function (req, res) {
    Question.findOne({
        where: {id: req.params.id},
        include: {
            model: Answer
        }
    }).then(question => {
        if(question){
            res.render("question", {question: question})
        } else{
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
});

app.post("/resposta/:id", function (req, res) {
    var idQuestion = req.params.id;
    var desc = req.body.desc;
    Answer.create({
        descricao: desc,
        perguntaID: idQuestion
    }).then(() => {
        res.redirect("/questao/"+idQuestion)
    }).catch(err => {
        res.send("Erro " +err)
    })
});

app.listen(8081, function () {
    console.log("app rodando");
})