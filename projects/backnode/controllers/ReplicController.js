var database = require("../database/database");

class ReplicController{
    async getData(req, res) {
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
            `).timeout(10000); // tempo limite de 10 segundos para a consulta ser realizada

            array["result"] = result;
            res.send({success: "Requisição feita com sucesso", newArray: array})
        } catch(error) {
            res.status(406);
            array["err"] = "Ocorreu um erro de conexão";
            res.send({newArray: array, err: "Ocorreu um erro de conexão"});
            return;
        }
    }

    async getNetworks(req, res) {
        try{
            var networks  = await database.raw(`
	            select NOME_REDE from rede
            `)
        } catch(error){
            res.status(406);
            res.send({err: `Ocorreu um erro na inserção da rede ${networkName}, segue a mensagem de erro: ${error}`});
            return;
        } 
    }

    async postNetworks(req, res) {
        var networkName = await req.body.network;
        try{
            var networks  = await database.raw(`
	            select NOME_REDE from rede
            `)

            for(var x=0; x < networks.length; x++){
                if(JSON.stringify(networks[x].NOME_REDE.toUpperCase()).match(networkName.toUpperCase())){
                    res.status(406);
                    res.send({err: `Já existe uma rede criada com o nome ${networkName}`});
                    return;
                }
            }

            var select = await database.raw(`
                insert into rede (NOME_REDE) values ('${networkName}')
            `); 
        } catch(error) {
            res.status(406);
            res.send({err: `Ocorreu um erro na inserção da rede ${networkName}, segue a mensagem de erro: ${error}`});
            return;
        }

        res.send({success: "Rede cadastrada com sucesso!"})
    }
}

module.exports = new ReplicController();