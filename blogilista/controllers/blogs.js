const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log(blog)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(console.error("no content"))
  })

blogsRouter.get('/:id', (request, response) => {

  Blog
    .findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(204).end()
    }
    })
    .catch(error => {
      console.log(`request rejected for id:${request.params.id} | not found`)
    })
})



module.exports =  blogsRouter