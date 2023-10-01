const Sequelize = require('sequelize')
//mysql -hcontainers-us-west-67.railway.app -uroot -pX9DhrzVUXW4BgINs3Ecq --port 6217 --protocol=TCP railway
connection = new Sequelize('ask','root','X9DhrzVUXW4BgINs3Ecq',{
  host: 'containers-us-west-67.railway.app',
  dialect: 'mysql' ,
  port: 6217
})


module.exports = connection