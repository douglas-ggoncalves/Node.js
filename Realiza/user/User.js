const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }, login: {
        type: Sequelize.STRING,
        allowNull: false
    }, senha: {
        type: Sequelize.STRING,
        allowNull: false
    }, status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, nivelDeAcesso: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//User.sync({ force: true }); // apagar

module.exports = User;