var express = require("express");
var app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const slugify = require("slugify");
const OrderController = require("./order/OrderController");
const Order = require("./order/Order");
const User = require("./user/User");

//database
const connection = require("./database/database");
connection.authenticate()
    .then(() => {
        console.log("Conexão feita com o banco !");
    })
    .catch((errorMessage) => {
        console.log(errorMessage);
    });

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false
}))

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index", { error: "0" });
});

app.get("/logout", (req, res) => {
    req.session.login = null;
    res.render("index", { error: "0" });
});

app.get("/sobre", (req, res) => {
    if (req.session.login) {
        User.findOne({
            where: {
                login: req.session.login
            }
        }).then(user => {
            if (user != undefined) {
                res.render("user/about", { login: req.session.login, user: user });
            } else {
                res.render("index", { error: "0" })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    else {
        res.render("index", { error: "0" })
    }
});

app.get("/cadastro", (req, res) => {
    if (req.session.login) {
        User.findOne({
            where: {
                login: req.session.login
            }
        }).then(user => {
            if (user != undefined) {
                res.render("user/cadastro", { login: req.session.login, user: user });
            } else {
                res.render("index", { error: "0" })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    else {
        res.render("index", { error: "0" })
    }
});

app.use("/", OrderController);

app.post("/home", (req, res) => {
    var login = req.body.login;
    var password = req.body.password;

    User.findOne({
        where: {
            login: login,
            senha: password
        }
    }).then(user => {
        if (user != undefined) {
            req.session.login = login;
            req.session.password = password
            res.render("user/index", { login: login, user: user });
        } else {
            res.render("index", { error: "1" })
        }
    }).catch(err => {
        console.log(err)
    })
})

app.get("/home", (req, res) => {
    if (req.session.login) {
        User.findOne({
            where: {
                login: req.session.login
            }
        }).then(user => {
            if (user != undefined) {
                res.render("user/index", { login: req.session.login, user: user });
            } else {
                res.render("index", { error: "0" })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    else {
        res.render("index", { error: "0" })
    }
});


app.post("/salvarUser", (req, res) => {
    var nome = req.body.name;
    var login = req.body.login;
    var senha = req.body.password;
    var status = 1;
    var nivelDeAcesso = req.body.nivelDeAcesso;

    User.findOne({
        where: { login: login }
    }).then(user => {
        if (user != undefined) {
            res.render("user/cadastro", { login: req.session.login, user: user, nome: nome, usuario: login, senha: senha, ADM: true });
        } else {
            User.create({
                nome: nome,
                login: login,
                senha: senha,
                status: status,
                nivelDeAcesso: nivelDeAcesso
            }).then(user => {
                if (user != undefined) {
                    res.render("user/cadastro", { login: req.session.login, user: user, cadastro: true, ADM: true });
                } else {
                    res.render("user/cadastro", { login: req.session.login, user: user });
                }
            }).catch(err => {
                console.log(err)
            })
        }
    })
});

app.listen(8080, (erro) => {
    if (erro) {
        console.log("An error has occurred !");
    } else {
        console.log("Log in");
    }
})