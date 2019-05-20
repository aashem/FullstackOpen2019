const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter  = require('./controllers/login')

let mongoUrl = config.MONGOURI

  mongoose.connect(mongoUrl, { useNewUrlParser: true })
  console.log("Connected to database")
  
  app.use(bodyParser.json())
  app.use('/api/blogs', blogsRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/login', loginRouter)
  app.use(cors())
 

module.exports = app