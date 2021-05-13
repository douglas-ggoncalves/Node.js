const Sequelize = require("sequelize");
const connection = require ("../database/database");

const Admin = connection.define("admins", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }, login:{
        type: Sequelize.STRING,
        allowNull: false
    }, senha:{
        type: Sequelize.STRING,
        allowNull: false
    }, status:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

//Admin.sync({force: true}); // apagar

module.exports = Admin;