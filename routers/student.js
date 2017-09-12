const express = require('express')
const router = express.Router()
const model = require('../models')

router.use((req,res, next)=>{
  if(req.session.user.role == 'academic' || req.session.user.role == 'headmaster' || req.session.user.role == 'teacher'){
    next();
  }else{
    res.send('you must login as academic or headmaster or teacher');
  }
})

router.get('/',(req,res)=>{
  model.Student.findAll()
  .then((data)=>{
    res.render('student',{data:data,err:false})
    // res.send(data)
  })
})

router.get('/add',(req,res)=>{
  model.Student.findAll().then((data)=>{
    res.render('addstudent',{data:data})
  })
})

router.post('/add',(req,res)=>{
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
      //console.log(data,'<< data');
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

router.get('/addsubject/:id',(req,res)=>{
  model.Student.findById(req.params.id).then((data_students)=>{
    model.Subject.findAll().then((data_subjects)=>{
      res.render('addstudentsub',{data_students:data_students,data_subjects:data_subjects})
    })
  })
})

router.post('/addsubject/:id',(req,res)=>{
  model.StudentSubject.create({StudentId: req.params.id,
    SubjectId:req.body.SubjectId})
    .then(()=>{
    res.redirect('/student')
  })
})

module.exports = router
