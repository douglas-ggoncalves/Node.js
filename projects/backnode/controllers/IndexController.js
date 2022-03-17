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

    async home(req, res) {
    }

    async index(req, res) {
        try{
            var idsNetworks = await database.raw(`
                select rede.id from rede as rede
                left  join loja on rede.id = loja.redeid
                group by rede.id
            `);

            var stores = await database.raw(`
                select * from loja loja
                left  join rede on rede.id  = loja.redeid
            `);
        } catch(error) {
            res.status(406);
            res.send({err: "Ocorreu um erro na consulta do banco de dados  "+ error});
            return;
        }

        res.send({success: "Tudo OK", idsNetworks: idsNetworks, stores: stores})
    }

    async searchComands(req, res) {
        var array;

        try{
            array = await req.body.array
                var result = await database.raw(`
                select * FROM OPENROWSET('SQLNCLI','${array.IP_LOJA},${array.PORTA_LOJA}';'${array.LOGIN_LOJA}';'${array.SENHA_LOJA}',
                    'select idloja as ''IDLojaDestino'', count(*) as ''QuantidadesDeComandos'' from historico..comandoreplicacao group by idloja order by idloja'
                );
            `).timeout(5000); // tempo limite de 10 segundos para a consulta ser realizada

            array["result"] = result;
            res.send({success: "Requisição feita com sucesso", newArray: array})
        } catch(error) {
            res.status(406);
            array["err"] = "Ocorreu um erro de conexão";
            res.send({newArray: array, err: "Ocorreu um erro de conexão"});
            return;
        }
    }

    async searchRepresentative(req, res) {
        var select = await `
        select * from pessoa, cidade, representante
        where pessoa.cidade = cidade.codigo
        and pessoa.codigo = representante.pessoa`;

        try {
            await database.raw(select)
            res.send({success: "Requisição feita com sucesso", select: select})

        } catch(error) {
            res.status(406);
            res.send({err: error, select: select});
            return;
        }
    }
}

module.exports = new IndexController();