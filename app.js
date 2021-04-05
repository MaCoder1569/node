var express = require('express');
var app = express()
var main = require('./router/main.js')

// var bodyParser = require('body-parser')
const mariadb = require('mariadb')
const pool = mariadb.createPool({database:'express',host:'localhost', user:'root',port:3306,password:'qwaszx45', connectionLimit:5})

app.listen(3000,function(){
    console.log('start!!! express')
})

//static 디렉토리 : 위치 등록 시켜 놓으면 스테틱으로 불러온다
app.use(express.static('public'))
//bodyParser로 어떤 형식을 받을 것인지
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/main',main)

app.set('view engine','ejs')

//url routing
app.get('/', (req,res)=>{
    // res.send("<h1>hi friend!</h1>")
    res.sendFile(__dirname+"/public/main.html")
})

app.post('/email_port', (req,res)=>{
    // res.send("post_response")
    console.log(req.body)
    // res.send("<h1>email:" + req.body.email+"</h1>")
    res.render('email.ejs',{'email':req.body.email})
})

app.post('/ajax_send_email', async (req,res)=>{
    console.log(req.body)
    var email = req.body.email
    var responseData={}
    var conn = await pool.getConnection()
    var rows = await conn.query('select name from user where email="'+email+'"')
    if(rows[0]){
        responseData.result = "ok"
        responseData.name = rows[0].name
    }else{
        responseData.result = "fail"
        responseData.name = ""
    }
    res.json(responseData)
})
