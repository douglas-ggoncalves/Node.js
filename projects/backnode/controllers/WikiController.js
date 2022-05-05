var database = require("../database/database");
var Wiki = require("../models/Wiki")
class WikiController{
    async create(req, res){
        var title = req.body.title
        var desc = req.body.desc
        var status = req.body.status
        var moduleId = req.body.moduleId

        
        var result = await Wiki.new(title, desc, status, moduleId)  

        if(result != undefined){
            res.status(200);
            res.send({success: 'Postagem salva com sucesso'})
        } else{
            res.status(406);
            res.send({err: "Não foi possível cadastrar a postagem"})
        }
    }

    async getPosts(req, res){
        var teste = await Wiki.findPosts();
        console.log('teste ' + JSON.stringify(teste))


        if(teste != undefined){
            res.status(200);
            res.send({arrayPosts: teste})
        } else{
            res.status(406);
            res.send({err: "Não foi possível carregas as postagens"})
        }
    }
}

module.exports = new WikiController();