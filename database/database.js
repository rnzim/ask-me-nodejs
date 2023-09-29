const Sequelize = require('sequelize')

connection = new Sequelize('ask','root','',{
  host: 'localhost',
  dialect: 'mysql'  
})

module.exports = connection