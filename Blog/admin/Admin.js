const Sequelize = require("sequelize");
const connection = require("../database/database");

const Admin = connection.define("admin", {
    login: {
        type: Sequelize.STRING,
        allowNull: false
    }, senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Admin;