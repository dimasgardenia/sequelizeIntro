const express = require('express')
const app = express()
const model = require('./models')
const bodyParser = require('body-parser')

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const teacher = require('./routers/teacher')
const subject = require('./routers/subject')
const student = require('./routers/student')

app.use('/teacher',teacher)
app.use('/subject',subject)
app.use('/student',student)


app.listen(3000,()=>{
  console.log('i am on port 3000');
})
