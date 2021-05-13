const Sequelize = require("sequelize");

const connection = new Sequelize("realiza", "root", '93336848',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;