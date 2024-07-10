const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticleController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');

// View engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Database connected')
    }).catch((error) => {
        console.log(error)
    })

// Importando as rotas de categories
app.use('/', categoriesController);

// Importando as rotas de artigos
app.use('/', articlesController)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8080, () => {
    console.log('Srver On')
})