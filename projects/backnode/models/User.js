var knex = require("../database/database");
var bcrypt = require("bcrypt");
//const PasswordTokens = require("./PasswordTokens");

class User{
    async findLogin(login) {
        try {
            var result = await knex.select().where({LOGIN_USUARIO: login}).table("USUARIO");
            if(result.length > 0) {
                return result[0];
            } else {
                return undefined;
            }
        } catch(err) {
            console.log(err);
            return undefined;
        }
    }

    async newUser(login, password, role, networkId){
        try {
            var hash = await bcrypt.hash(password, 10);
            if(networkId == ''){
                await knex.insert({LOGIN_USUARIO: login, CARGO_USUARIO: role, SENHA_USUARIO: hash}).table("USUARIO");
            } else{
                await knex.insert({LOGIN_USUARIO: login, CARGO_USUARIO: role, SENHA_USUARIO: hash, REDEID_USUARIO: networkId}).table("USUARIO");
            }
            console.log(login, password, role)
        } catch(err) {
            console.log(err)
        }
    }

    async loginUser(login, password) {
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
    }

    async findAllUser(){
        try {
            var result = await knex.select().table("USUARIO");
            return result;
        } catch(err) {
            console.log(err);
            return undefined;
        }
    }
    
}

module.exports = new User();


