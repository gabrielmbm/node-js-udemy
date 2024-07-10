const Sequelize = require('sequelize')

const connection = new Sequelize('guiapress', 'root', 'Model2309!', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection