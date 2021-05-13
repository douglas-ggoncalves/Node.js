var express = require("express");
var app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))

const slugify = require("slugify");
const adminController = require("./admin/AdminController");
const ClientController = require("./client/ClientController");
const EmployeeController = require("./employee/EmployeeController");
const OrderController = require("./order/OrderController");
const Admin = require("./admin/Admin");
const Client = require("./client/Client");
const Employee = require("./employee/Employee");
const Order = require("./order/Order");

//database
const connection = require("./database/database");
connection.authenticate()
    .then(() => {
        console.log("Conexão feita com o banco !");
    })
    .catch((errorMessage) => {
        console.log(errorMessage);
    })

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index", { error: "0" });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.render("index", { error: "0" });
});


app.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

app.use("/", adminController);
app.use("/", OrderController);
app.use("/", ClientController);
app.use("/", EmployeeController);
app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false
//    cookie: { maxAge: 1 * 60 * 1000 }
}))

app.post("/home", (req, res) => {
    var login = req.body.login;
    var password = req.body.password;

    Client.findOne({
        where: {
            login: login,
            senha: password
        }
    }).then(user => {
        if (user != undefined) {
            req.session.login = login;
            req.session.password = password
            res.render("user/index", { login: login });
        } else {
            res.render("index", { error: "1" });
        }
    }).catch(err => {
        console.log(err)
    })

})

app.get("/home", (req, res) => {
    if (req.session.login) {
        res.render("user/index", { login: req.session.login });
    } else {
        res.render("index", { error: "0" })
    }
})

app.listen(8080, (erro) => {
    if (erro) {
        console.log("An error has occurred !");
    } else {
        console.log("Log in");
    }
})