const Sequelize = require("sequelize");
const connection = require ("../database/database");
const Admin = require("../admin/Admin");


const Employee = connection.define("employees", {
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

Admin.hasMany(Employee);
Employee.belongsTo(Admin);

//Employee.sync({force: true}); // apagar

module.exports = Employee;