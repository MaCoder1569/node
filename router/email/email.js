var express = require('express')
var router = express.Router()
var path = require('path')

const mariadb = require('mariadb')
const pool = mariadb.createPool({database:'express',host:'localhost', user:'root',port:3306,password:'qwaszx45', connectionLimit:5})

router.post('/form', (req,res)=>{
    // res.send("post_response")
    console.log(req.body)
    // res.send("<h1>email:" + req.body.email+"</h1>")
    res.render('email.ejs',{'email':req.body.email})
})

router.post('/ajax', async (req,res)=>{
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

module.exports = router