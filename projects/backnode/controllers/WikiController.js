var slugify = require('slugify')
var Wiki = require("../models/Wiki")

class WikiController{
    async create(req, res){
        var title = req.body.title
        var slug = slugify(title.toLowerCase())
        var desc = req.body.desc
        var status = req.body.status
        var moduleId = req.body.moduleId

        var existPost = await Wiki.findByTitle(title);
        if(existPost != undefined){
            res.status(406);
            res.send({err: "Já existe uma postagem com este título"})
            return;
        } else{
            var result = await Wiki.new(title, slug, desc, status, moduleId)  

            if(result != undefined){
                res.status(200);
                res.send({success: 'Postagem salva com sucesso'})
            } else{
                res.status(406);
                res.send({err: "Não foi possível cadastrar a postagem"})
            }
        }
    }

    async getPosts(req, res){
        var posts = await Wiki.findPosts();

        if(posts != undefined){
            res.status(200);
            res.send({arrayPosts: posts})
        } else{
            res.status(406);
            res.send({err: "Não foi possível carregar as postagens"})
        }
    }
}

module.exports = new WikiController();