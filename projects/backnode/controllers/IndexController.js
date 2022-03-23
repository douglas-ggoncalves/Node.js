var database = require("../database/database");

class IndexController{
    async login(req, res) {
    var login = await req.body.login;
    var password = await req.body.password;

    try{
        var query = await database.raw(`
            select * from USUARIO where login = '${login}' and senha = '${password}'
        `);
    } catch(err) {
        console.log(err)
    }

    if(query.length == 0) {
        console.log("caiu no if")
        res.status(404)
        res.send({err: "Login ou senha incorretos"})
        return
    } else {
        res.send({success: "Usuário logado", login: login, password: password})
    }
    }
}

module.exports = new IndexController();