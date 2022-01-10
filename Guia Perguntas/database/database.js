const Sequelize = require("sequelize");

const connection = new Sequelize("myBank", 'root', '93336848' , {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;