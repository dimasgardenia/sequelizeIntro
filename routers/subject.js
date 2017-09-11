const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/',(req,res)=>{
  model.Subject.findAll({include: [model.Teacher]}).then(data=>{
    res.render('subject',{data:data})
  })
})

router.get("/enrolledstudents/:id",(req,res)=>{
  model.Subject.findById(req.params.id).then(data=>{
    model.StudentSubject.findAll({
      include:[{all:true}],
      where:{
        SubjectId : req.params.id
      }
    }).then(param=>{
      res.render('enrolledstudents',{data:data,param:param})
      res.send(data)
    })
  })
})



module.exports = router
