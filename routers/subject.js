const express = require('express')
const router = express.Router()
const model = require('../models')
const giveLetter = require('../helpers/score')

router.use((req,res, next)=>{
  if(req.session.user.role == 'academic' || req.session.user.role == 'headmaster'){
    next();
  }else{
    res.send('you must login as academic or headmaster');
  }
})

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
      // res.send(param)
    })
  })
})

router.get('/givescore/:idst/:idsb', (req, res) => {
  model.Student.findAll({
    where: {
      id: req.params.idst
    }
  })
  .then(data_students => {
    model.Subject.findAll({
      where: {
        id: req.params.idsb
      }
    })
    .then(data_subjects => {
      res.render('givescore', {
        data_students: data_students,
        data_subjects: data_subjects
      })
    })
  })
})

router.post('/givescore/:idst/:idsb', (req, res) => {
  model.StudentSubject.update({
    score: req.body.score
  }, {
    where: {
      StudentId: req.params.idst
    }
  })
  .then(() => {
    res.redirect(`/subject/enrolledstudents/${req.params.idsb}`)
  })
})

module.exports = router
