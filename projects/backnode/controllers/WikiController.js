var database = require("../database/database");

class WikiController{
    async create(req, res){
        var title = req.body.title
        var desc = req.body.desc
        var status = req.body.status

        console.log("title " + title + ' ' + "desc " + desc + ' ' + "status " + status )
    }
}

module.exports = new WikiController();