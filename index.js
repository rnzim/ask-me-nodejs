const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

//database

connection
.authenticate().
then(()=>{
  console.log('coxexao com db is sucesss')
})
.catch((msgErro) => {
  console.log('erro ')
})


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//define a view engine
app.set('view engine','ejs')

//pasta de arquivos estaticos
app.use(express.static('public'))

//cria uma rota com o methodo post onde recebe o titulo
//ea descrição de um formulario do metodo post
app.post("/salvar",(req,res)=>{
  var titulo = req.body.titulo
  var desc = req.body.desc
  
  //cria a tabela de perguntas
  Pergunta.create({
    titulo: titulo,
    desc: desc
  }).then(()=>{
    res.redirect("/")
  })
 
  
})
//rota
app.get('/perguntar',(req,res)=>{
 
   res.render('perguntar')
})
app.get('/',(req,res)=>{
  //lista as perguntas da tabela perguntas
  Pergunta.findAll(({raw:true, order: [['id','desc']]})).then((perguntas)=>{
    res.render('index.ejs',{
      perguntas:perguntas,
      
    })
  })
})
app.get("/p/:id",(req,res)=>{
  var id = req.params.id
 
   Pergunta.findAll({
    where: {
      id:id 
    }
   }).then((pergunta)=>{
    
        Resposta.findAll({raw:true,
        where: {idPergunta:id},
        order:[
            ['id','desc']
          ]
        
      }).then((resposta)=>{
        console.log(resposta)

        res.render('resposta.ejs',{pergunta:pergunta,resposta:resposta})
       
     })
     
    
   })
})
app.post('/responder',(req,res)=>{
   var corpo = req.body.corpo
   var idPergunta = req.body.idPe
   Resposta.create(
    {
      corpo:corpo,
      idPergunta:idPergunta
    }
   ).then(()=>{
    console.log("alguem respondeu")
   })
   res.redirect('/p/'+idPergunta)
})

app.listen(3000,()=>{ console.log('\u001b[32mRuning \u001b[32mServer') })