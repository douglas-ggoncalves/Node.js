var database = require("../database/database");

class IndexController{
    async login(req, res) {
    var login = await req.body.login;
    var password = await req.body.password;
    var query = await database.raw(`
        select * from USUARIO where login = 'DG' and senha = '${password}'
    `);

    if(query == '') {
        console.log(query)
        console.log("Usuário ou senhas incorretos")
    } else {
        res.send({success: "Usuário logado", login: login, password: password})
    }
    }
}

module.exports = new IndexController();