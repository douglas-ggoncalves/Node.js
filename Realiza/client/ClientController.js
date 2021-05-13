const express = require("express");
const router = express.Router();
const session = require("express-session");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))
const Client = require("./Client");

const slugify = require("slugify");
const Order = require("../order/Order");

router.use(session({
  secret: '123',
  resave: false,
  saveUninitialized: false
  //cookie: { maxAge: 1 * 60 * 1000 }
}))

router.post("/salvarClient", (req, res) => {
  var nome = req.body.nameC;
  var login = req.body.loginC;
  var senha = req.body.passwordC;
  var cpfCNPJ = req.body.cpfCNPJ;
  var status = 1;

  Client.create({
    nome: nome,
    login: login,
    senha: senha,
    cpfCnpj: cpfCNPJ,
    status: status
  }).then(() => {
    res.send("Cliente " + nome + " Cadastrado");
  }).catch(err => {
    console.log(err)
  })
});

router.get("/configuracoes", (req, res) => {
  var clientID = req.body.clientID;
  res.render("./user/settings", { clientID: clientID });
});

router.get("/sobre", (req, res) => {
  if (req.session.login) {
    var clientID = req.session.password;
    res.render("./user/about", { clientID: clientID });
  } else {
  }
});

module.exports = router;