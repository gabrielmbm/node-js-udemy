const express = require('express');
const router = express.Router();

router.get('/articles', (req, res) => {
    res.send('ROTA DE ARTIGOS')
});

router.get('/admin/articles/new', (req, res) => {
    res.send('ADM DE ARTIGOS')
});

module.exports = router 