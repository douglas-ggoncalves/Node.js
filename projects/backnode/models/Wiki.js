var knex = require("../database/database");
var bcrypt = require("bcrypt");

class Wiki{
    async new(title, slug, desc, status, moduleId){
        try {
            var result = await knex.insert({TITULO: title, SLUG: slug , DESCRICAO: desc, ATIVO: status, CODMODULO: moduleId}).table("POSTAGEM");
            return result;
        } catch(err) {
            return undefined;
        }
    }

    async findByTitle(title){
        var result = await knex.select().where({TITULO: title}).table("POSTAGEM")

        if(result.length > 0) {
            return result[0];
        } else {
            return undefined;
        }
    }

    async findPosts(){
        var result = knex.select().table("POSTAGEM")
        return result;
    }
}

module.exports = new Wiki();


