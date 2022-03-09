var database = require("../database/database");

class IndexController{

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
        var array = await req.body.array
        console.log("Array que chegou " + JSON.stringify(array))
        console.log("Fim da req")
        res.send({success: "Olá", newArray: 'aaaa '})
    }
}

module.exports = new IndexController();