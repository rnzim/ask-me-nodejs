const Sequelize = require('sequelize')

connection = new Sequelize('ask','uroot','9EkwqAMyyWWqQx7IHFXU',{
  host: 'hcontainers-us-west-154.railway.app',
  dialect: 'mysql'  
})

module.exports = connection

