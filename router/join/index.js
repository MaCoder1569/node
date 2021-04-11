var express = require('express')
var router = express.Router()
var path = require('path')

const mariadb = require('mariadb')
const pool = mariadb.createPool({database:'express',host:'localhost', user:'root',port:3306,password:'qwaszx45', connectionLimit:5})

router.get('/', async (req,res)=>{
    res.sendFile(path.join(__dirname,'../../public/join.html'))
})

module.exports = router