var database = require("../database/database");
var User = require("../models/User");

var jwt = require("jsonwebtoken");
var secret = "as55a6a5as5d4a5qvjnkalçKASNFJLkakfnJKKjknldjsn";
var bcrypt = require("bcrypt");

class UserController{
    

    async login(req, res) {
        var login = await req.body.login;
        var password = await req.body.password;

        var verifyLogin = await User.findLogin(login);

        /*

        try{
            var query = await database.raw(`
                select * from USUARIO where login = '${login}' and senha = '${password}'
            `);
        } catch(err) {
            console.log(err)
        }

        if(query.length == 0) {
            res.status(404)
            res.send({err: "Login ou senha incorretos"})
            return
        } else {
            res.send({success: "Usuário logado", login: login, password: password})
        }
        */
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
    
    
}

module.exports = new UserController();