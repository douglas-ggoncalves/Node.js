var knex = require("../database/database");
var bcrypt = require("bcrypt");

class Wiki{
    async new(title, desc, status, moduleId){
        try {
            var result = await knex.insert({TITULO: title, DESCRICAO: desc, ATIVO: status, CODMODULO: moduleId}).table("POSTAGEM");
            return result;
        } catch(err) {
            return undefined;
        }
    }

    async findPosts(){
        var result = knex.select().table("POSTAGEM")
        console.log("teste")
        return result;
    }
}

module.exports = new Wiki();


