const express = require('express')
const router = express.Router()
const model = require('../models')
//console.log(model);

router.get('/',(req,res)=>{
  model.Teacher.findAll({include : [model.Subject]}).then(function(data){
    //console.log(data, '<---');
    //res.send(data)
    res.render('teacher',{data:data})
  })
})

router.get('/add', (req,res)=>{
  model.Subject.findAll().then(function(data){
    console.log(data)
    res.render('addteacher',{data:data})
    //res.send(data)
  })
})
//
router.post('/add',(req,res)=>{
  model.Teacher.create(req.body)
    .then(function(){
      res.redirect('/teacher')
    })
    .catch(err => console.log(err))
})

router.get('/edit/:id', function(req,res){
  model.Teacher.findById(req.params.id).then(data=>{
    model.Subject.findAll().then(datasub=>{
      res.render('editteacher',{data:data, datasub:datasub})
      //res.send(data)
    })
  })
  //res.send('halo')
})

router.post('/edit/:id', function(req,res){
  model.Teacher.update(req.body,{

    where:{id:`${req.params.id}`
    }
  }).then(()=>{
    res.redirect('/teacher')
  })
})

router.get('/delete/:id',function(req,res){
  model.Teacher.destroy({where:{id:`${req.params.id}`}}).then(()=>{
    res.redirect('/teacher')
  })
})

module.exports = router
