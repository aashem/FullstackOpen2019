const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

let mongoUrl = config.MONGOURI

  mongoose.connect(mongoUrl, { useNewUrlParser: true })
  console.log("Connected to database")
  
  app.use(bodyParser.json())
  app.use('/api/blogs', blogsRouter)
  app.use(cors())
 

module.exports = app