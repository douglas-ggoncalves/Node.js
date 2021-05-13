const Sequelize = require("sequelize");
const connection = require ("../database/database");
const Employee = require("../employee/Employee");
const Client = require("../client/Client")

const Order = connection.define("orders", {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }, status:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Client.hasMany(Order);
Order.belongsTo(Client);

Employee.hasMany(Order);
Order.belongsTo(Employee);


//Order.sync({force: true}); // apagar

module.exports = Order;