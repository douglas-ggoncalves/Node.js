var database = require("../database/database");
var User = require("../models/User");

var jwt = require("jsonwebtoken");
var secret = "as55a6a5as5d4a5qvjnkalçKASNFJLkakfnJKKjknldjsn";
var bcrypt = require("bcrypt");

class UserController{
    async login(req, res) {
        var login = await req.body.login;
        var password = await req.body.password;
        var user = await User.findLogin(login);

        if(user != undefined) {
            var result = await bcrypt.compare(password, user.SENHA_USUARIO);
            if(result) {
                var token = await jwt.sign({ idNetworkUser: user.REDEID_USUARIO, role: user.CARGO_USUARIO }, secret);
                res.status(200);
                res.send({token: token, user: user})
            } else {
                res.status(406);
                res.send({err: "Senha incorreta"});
            }
        } else{
            res.status(406);
            res.json({status: false, err: "O usuário não existe"})
        }
    }

    async create(req, res) {
        var login = await req.body.login;
        var password = await req.body.password;
        var role = await req.body.role;
        var networkId = await req.body.networkId;
        
        if(login != undefined && password != undefined){
            var loginExists = await User.findLogin(login);

            if(loginExists != undefined){ // login existe
                res.status(404)
                res.send({err: "Já existe um usuário com este login"})
                return
            } else{
                var newUser = await User.newUser(login, password, role, networkId)
                res.send({success: "Usuário criado com sucesso"})
            }
        }
    }

    async getUsers(req, res) {
        var users = await User.findAllUser();
        res.send(users)
    }

    async validate(req, res) {
        res.status(200)
        res.send("Ok");
    }
}

module.exports = new UserController();