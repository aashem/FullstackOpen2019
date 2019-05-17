const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/',(request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log(blog)
    if (blog.likes !== Number){
      blog.likes = 0
    }
    if(blog.title && blog.url !== String){
      response.status(400).end()
    }else{

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
    }
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

blogsRouter.delete('/:id', (request, response) => {

  Blog
    .findByIdAndDelete(request.params.id)
    .then(blog => {
      response.json(blog.toJSON())
    })
    .catch(console.error("FAILURE"))
})



module.exports =  blogsRouter