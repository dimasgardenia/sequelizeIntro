const express = require('express')
const router = express.Router()
const model = require('../models')
//console.log(model);

router.get('/',(req,res)=>{
  model.Teacher.findAll().then(function(data){
    //res.send(data)
    res.render('teacher',{data:data})
  })
})
module.exports = router
