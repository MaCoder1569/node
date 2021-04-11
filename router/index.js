var express = require('express')
var router = express.Router()
var path = require('path')

var main = require('./main.js')
var email = require('./email.js');


//url routing
router.get('/', (req,res)=>{
    // res.send("<h1>hi friend!</h1>")
    res.sendFile(path.join(__dirname,"../public/main.html"))
})

router.use('/main',main)
router.use('/email',email)

module.exports = router