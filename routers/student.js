const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/',(req,res)=>{
  model.Student.findAll()
  .then((data)=>{
    res.render('student',{data:data,err:false})
  })
})

router.post('/',(req,res)=>{
  model.Student.create({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email: req.body.email,
    createAt: new Date(),
    updateAt: new Date()
  }).then(()=>{
    res.redirect('/student')
  }).catch((msg)=>{
    //res.render('student',{data:data,err:err})
    model.Student.findAll()
    .then((data)=>{
      console.log(msg);
      res.render('student',{data:data, err:msg})
    })
  })
})

router.get('/edit/:id',(req,res)=>{
  model.Student.findById(req.params.id)
  .then((data)=>{
    res.render('editstudent',{data:data})
  }).catch((err)=>{
    res.send(err)
  })
})

router.post('/edit/:id',(req,res)=>{
  model.Student.update(
    {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  },{
    where:{
      id: parseInt(req.params.id)
    }
  }).then((err,data)=>{
    res.redirect('/student')
  })
})

router.get('/delete/:id',(req,res)=>{
  model.Student.destroy({
    where:{
      id: req.params.id
    }
  }).then(()=>{
    res.redirect('/student')
  })
})

module.exports = router
