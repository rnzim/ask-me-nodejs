const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('view engine','ejs')
app.use(express.static('public'))

app.post("/salvar",(req,res)=>{
  var titulo = req.body.titulo
  var desc = req.body.desc
  console.log('recebi os dados: '+ titulo + ' '+ desc)
  res.send('recebi os dados: '+ titulo + ' '+ desc)
})
app.get('/peguntar',(req,res)=>{
 
   res.render('perguntar')
})
app.get('/',(req,res)=>{

  res.render('index.ejs')

})
app.listen(12,()=>{ console.log('\u001b[32mRuning \u001b[32mServer') })