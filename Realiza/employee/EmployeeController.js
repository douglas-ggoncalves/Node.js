const express = require("express");
const router = express.Router();
const Employee = require("./Employee");
const session = require("express-session");

router.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1 * 60 * 1000 }
}))

router.post("/salvarEmployee", (req, res) => {
    var nome = req.body.nameE;
    var login = req.body.loginE;
    var senha = req.body.passwordE;
    var status = 1;

    Employee.create({
        nome: nome,
        login: login,
        senha: senha,
        status: status
    }).then(() => {
        res.send("Funcionário " + nome + " Cadastrado");
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;