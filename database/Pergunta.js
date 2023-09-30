const Sequelize = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('perguntas',
   {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false

    },
    desc:{
        type: Sequelize.TEXT,
        allowNull: false
    }
   }
)
Pergunta.sync({force: false}).then(()=>{console.log('\u001b[34m table created')})

module.exports = Pergunta