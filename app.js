const express = require('express')
const app = express()
const model = require('./models')
const bodyParser = require('body-parser')
const session = require('express-session')

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const index = require('./routers/index')
const teacher = require('./routers/teacher')
const subject = require('./routers/subject')
const student = require('./routers/student')

app.use(session({
  secret: 'dimasgardenia',
  resave: false,
  saveUnitialized: true,
  cookie: {}
}))


app.use('/',index)
app.use('/teacher',teacher)
app.use('/subject',subject)
app.use('/student',student)


app.listen(process.env.PORT || 3000,()=>{
  console.log('i am on port 3000');
})
