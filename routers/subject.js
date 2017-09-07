const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/',(req,res)=>{
  model.Subject.findAll().then(data=>{
    //res.send(data)
    res.render('subject',{data:data})
  })
})

module.exports = router
