const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session')
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticleController');
const usersController = require('./users/UsersController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

// View engine
app.set('view engine', 'ejs');

// Config sessões
app.use(session({
    secret: 'guiapress',
    cookie: {
        maxAge: 30000
    }
}))

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

// Importando as rotas de users
app.use('/', usersController)

app.get('/session', (req, res) => {
    // Parei aqui
});

app.get('/leitura', (req, res) => {
    // Parei aqui
});

app.get('/', (req, res) => {
    Article.findAll({
        order: [
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles: articles, categories: categories});
        });
        
    });
});

app.get('/:slug', (req, res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render('article', {article: article, categories: categories});
            });
        }else{
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    });
});

app.get('/category/:slug', (req, res) => {
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then( category => {
        if(category != undefined){
            Category.findAll().then( categories => {
                res.render('index', {articles: category.articles, categories: categories})
            })
        }else{
            res.redirect('/');
        }
    }).catch( err => {
        res.redirect('/');
    })
})

app.listen(8080, () => {
    console.log('Srver On')
});