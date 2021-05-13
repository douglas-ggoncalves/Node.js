const Sequelize = require("sequelize");
const connection = require ("../database/database");


const Client = connection.define("clients", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }, login:{
        type: Sequelize.STRING,
        allowNull: false
    }, senha:{
        type: Sequelize.STRING,
        allowNull: false
    }, cpfCnpj:{
        type: Sequelize.INTEGER,
        allowNull: false
    }, status:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

//Client.sync({force: true}); // apagar

module.exports = Client;