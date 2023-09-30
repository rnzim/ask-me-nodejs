const connection = require('./database')
const Sequelize = require('sequelize')

const Resposta = connection.define('resposta',{
   
     corpo:{
        type: Sequelize.TEXT,
        allowNull: false
     },
     idPergunta:{
        type: Sequelize.INTEGER,
        allowNull: false
     }

})
Resposta.sync({force: false}).then(()=>{
    console.log("\u001b[35m created response table")
})
module.exports = Resposta