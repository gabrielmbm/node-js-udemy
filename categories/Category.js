const Sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Assim que salvar, comentar a linha para o programa não criar novamente  a tabela
//Category.sync({force: true});

module.exports = Category;