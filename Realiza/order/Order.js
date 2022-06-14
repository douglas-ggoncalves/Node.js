const Sequelize = require("sequelize");
const connection = require ("../database/database");
const User = require("../user/User");

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

User.hasMany(Order);
Order.belongsTo(User);

//Order.sync({force: true}); // apagar

module.exports = Order;