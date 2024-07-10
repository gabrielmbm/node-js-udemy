const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article); //Mètodo 1:Muitos -> Uma categoria tem muitos artigos
Article.belongsTo(Category); //Método 1:1 -> Um artigo pertece a uma categoria

//Assim que salvar, comentar a linha para o programa não criar novamente  a tabela
//Article.sync({force: true});

module.exports = Article;