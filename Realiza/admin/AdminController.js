const express = require("express");
const router = express.Router();
const Admin = require("./Admin");


router.get("/about/:id", (req, res) => {
  var id = req.params.id;
  res.render("./admin/about", {id: id});
});

router.post("/salvarAdmin", (req, res) => {
  var nome = req.body.name;
  var login = req.body.login;
  var senha = req.body.passwordA;
  var status = 1;

  Admin.create({
      nome: nome,
      login: login,
      senha: senha,
      status: status
  }).then(() => {
      res.send("Admin " + nome + " Cadastrado");
  }).catch(err => {
      console.log(err)
  })
})

module.exports = router;