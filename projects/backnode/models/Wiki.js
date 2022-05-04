var knex = require("../database/database");
var bcrypt = require("bcrypt");

class Wiki{
    async newUser(login, email, password, role, networkId){
        try {
            var hash = await bcrypt.hash(password, 10);
            var result;
            if(networkId == ''){
                result = await knex.insert({LOGIN_USUARIO: login, EMAIL_USUARIO: email, CARGO_USUARIO: role, SENHA_USUARIO: hash}).table("USUARIO");
                return result;
            } else{
                result = await knex.insert({LOGIN_USUARIO: login, EMAIL_USUARIO: email, CARGO_USUARIO: role, SENHA_USUARIO: hash, REDEID_USUARIO: networkId}).table("USUARIO");
                return result;
            }
        } catch(err) {
            console.log(err)
            return undefined;
        }
    }
}

module.exports = new Wiki();


