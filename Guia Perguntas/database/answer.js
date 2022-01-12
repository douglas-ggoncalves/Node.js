const Sequelize = require("sequelize");
const connection = require("./database");
const Question = require("./question");

const Answer = connection.define("resposta", {
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Question.hasMany(Answer, { foreignKey: 'perguntaID' });

/*
Answer.sync({ force: false }).then(() => {
    console.log("Tabela criada")
});
*/

module.exports = Answer;