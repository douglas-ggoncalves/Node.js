const Sequelize = require("sequelize");
const connection = require("../database/database");

const Article = connection.define("artigos", {
    login: {
        type: Sequelize.STRING,
        allowNull: false
    }, senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Article;