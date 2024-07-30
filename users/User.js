const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Assim que salvar, comentar a linha para o programa não criar novamente  a tabela
// User.sync({force: true});

module.exports = User;