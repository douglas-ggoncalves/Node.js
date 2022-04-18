var database = require("../database/database");
var User = require("../models/User");
var jwt = require("jsonwebtoken");
var secret = "as55a6a5as5d4a5qvjnkalçKASNFJLkakfnJKKjknldjsn";
var bcrypt = require("bcrypt");
const PasswordTokens = require("../models/PasswordTokens");

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
            res.json({status: false, err: "O usuário informado não existe"})
        }
    }

    async create(req, res) {
        var login = await req.body.login;
        var email = await req.body.email;
        var password = await req.body.password;
        var role = await req.body.role;
        var networkId = await req.body.networkId;

        try{
            if(login != undefined && password != undefined){
                var loginExists = await User.findLogin(login);
                var loginEmail = await User.findEmail(email);
                
                if(loginExists != undefined){ // login existe
                    res.status(404)
                    res.send({err: "Já existe um usuário com este login"})
                    return
                } else{
                    if(loginEmail != undefined){
                        res.status(404)
                        res.send({err: "Já existe um usuário com este email"})
                        return
                    } else{
                        var newUser = await User.newUser(login, email, password, role, networkId)
                        if(newUser != undefined){
                            res.send({success: "Usuário criado com sucesso"})
                            return;
                        } else {
                            res.status(406);
                            res.send({err: 'Ocorreu um erro ao tentar cadastrar o usuário '});
                            return;
                        }
                    }
                }
            }
        } catch(err)  {
            res.send({err: 'Ocorreu um erro ' + err});
            res.status(406);
            return;
        }
    }

    async recoveryPassword(req, res) {
        console.log("cjeg aa")
        
        var email = req.body.email;

        var result = await PasswordTokens.create(email);

       

    }

    async delete(req, res) {
        var login = req.params.login;

        if(login != undefined){
            var loginExists = await User.findLogin(login);

            if(loginExists != undefined){ // login existe
                res.status(200)
                var userDeleted = await User.deleteUser(login);
                if(userDeleted) {
                    res.send({success: "Usuário excluido"})
                    return
                }
                else{
                    res.status(404)
                    res.send({else: `Ocorreu um erro ao tentar excluir ${login}`})
                }
            } else{
                res.status(404)
                res.send({else: `Ocorreu um erro ao tentar excluir ${login}`})
            }
        }
    }

    async edit(req, res) {
        var login = await req.body.editLoginUser;
        var role = await req.body.editRoleUser;
        var network = await req.body.editRoleNetwork;
        var idUser = await req.body.idUser;

        try{
            var loginExists = await User.findLogin(login);

            if(loginExists != undefined && loginExists.ID_USUARIO != idUser){ // login existe e não é o mesmo login do usuário que mandou requisição
                    res.status(404)
                    res.send({err: "Já existe um usuário com este login"})
                    return
            } else {
                if(login != undefined && idUser != undefined){
                    var idExist = await User.findUserById(idUser);
        
                    if(idExist != undefined){ // login existe
                        var editUser = await User.editUser(login, role, network, idUser);
                        
                        if(editUser != undefined) {
                            res.status(200);
                            res.send({success: "Usuário editado com sucesso"})
                            return;
                        } else{
                            res.status(404)
                            res.send({success: "Não foi possível editar o usuário"})
                        }
                    } else{
                        res.status(404)
                        res.send({err: "Usuário não encontrado, não foi possível alterar o mesmo"})
                    }
                }
            }
        } catch(err)  {
            res.send({err: 'Ocorreu um erro ' + err});
            res.status(406);
            return;
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