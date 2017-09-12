const express = require('express')
const router = express.Router()
const model = require('../models')
const crypto = require('crypto');
const hash = require('../helpers/hash')

router.get('/',(req,res,next)=>{

if(req.session.user){
//  console.log(req.session.user)
    res.render('index')
  }else{
    res.redirect('/login')
  }
})

router.get('/', (req,res)=>{
  res.render('index')
})

router.get('/signup',(req,res)=>{
  model.User.findAll().then((data)=>{
    res.render('signup',{data:data})
    //res.send(data)
  })
})

router.post('/signup',(req,res)=>{
  model.User.create(req.body).then(()=>{
    res.redirect('/login')
  })
})

router.get('/login',(req,res)=>{
  if(req.session.user){
    res.redirect('/')
  }else{
    res.render('login')
  }
})

router.post('/login',(req,res)=>{
  if(!req.body.username || !req.body.password){
    res.send('please enter username and password')
  }else{
    model.User.findOne({
      where: {
        username:req.body.username
      }
    })
    .then(function(row){
      const secret = row.salt;
      // console.log(row.salt);
      // console.log(req.body.password);
      const hashData = hash(secret, req.body.password);

      if(hashData == row.password){
        req.session.user = {
          username: row.username,
          role: row.role
        }
        res.redirect('/')

      }else {
        res.render('login', {title:'login', msg: 'Wrong password'})
      }
    })
    .catch(function(err){
      res.send('user not found')
    })
  }
})

router.get('/logout', function(req,res){
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
