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

app.set('view engine','ejs')
app.use(express.static('public'))

app.post("/salvar",(req,res)=>{
  var titulo = req.body.titulo
  var desc = req.body.desc
  
  Pergunta.create({
    titulo: titulo,
    desc: desc
  }).then(()=>{
    res.redirect("/")
  })
 
  
})

app.get('/perguntar',(req,res)=>{
 
   res.render('perguntar')
})
app.get('/',(req,res)=>{
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
   }).then((id)=>{
      if(id != undefined){
      res.render('resposta.ejs',{id:id})
      console.log(id)
    }else{
      res.render('resposta.ejs',{id:"Pergunta não Encontrada, tente novemente"})
    }
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

app.listen(12,()=>{ console.log('\u001b[32mRuning \u001b[32mServer') })