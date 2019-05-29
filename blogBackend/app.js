const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter  = require('./controllers/login')
const middleware = require('./utils/middleware')


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let mongoUrl = config.MONGOURI

  mongoose.connect(mongoUrl, { useNewUrlParser: true })
  console.log("Connected to database")
  app.use(cors())
  app.use(bodyParser.json())
  app.use(middleware.tokenExtractor)
  
  app.use('/api/blogs', blogsRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/login', loginRouter)
  
 

module.exports = app