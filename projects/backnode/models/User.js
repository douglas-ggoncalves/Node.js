var knex = require("../database/database");
var bcrypt = require("bcrypt");
const PasswordTokens = require("./PasswordTokens");

class User{
    async findLogin(login) {
        try {
            var result = await knex.select().where({LOGIN_USUARIO: login}).from("USUARIO").leftOuterJoin('rede', 'rede.id', 'USUARIO.REDEID_USUARIO');
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
            var result;
            if(networkId == ''){
                result = await knex.insert({LOGIN_USUARIO: login, CARGO_USUARIO: role, SENHA_USUARIO: hash}).table("USUARIO");
                return result;
            } else{
                result = await knex.insert({LOGIN_USUARIO: login, CARGO_USUARIO: role, SENHA_USUARIO: hash, REDEID_USUARIO: networkId}).table("USUARIO");
                return result;
            }
        } catch(err) {
            console.log(err)
            return undefined;
        }
    }

    async deleteUser(login){
        try {
            var result = await knex.select().where({LOGIN_USUARIO: login}).from("USUARIO").del();
            return result;
        } catch(err) {
            console.log(err);
            return undefined;
        }
    }

    async findAllUser(){
        try {
            var result = await knex.select().from("USUARIO").leftOuterJoin('rede', 'rede.id', 'USUARIO.REDEID_USUARIO');
            return result;
        } catch(err) {
            console.log(err);
            return undefined;
        }
    }
    
}

module.exports = new User();


