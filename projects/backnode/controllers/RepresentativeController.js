var database = require("../database/database");

class RepresentativeController{
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

module.exports = new RepresentativeController();