var express = require('express');
var app = express()

var router = require('./router/index.js')
// const { route } = require('./router/email/email.js');

// var bodyParser = require('body-parser')

app.listen(3000,function(){
    console.log('start!!! express')
})

//static 디렉토리 : 위치 등록 시켜 놓으면 스테틱으로 불러온다
app.use(express.static('public'))
//bodyParser로 어떤 형식을 받을 것인지
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)

app.set('view engine','ejs')



