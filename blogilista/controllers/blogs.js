const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


blogsRouter.get('/', async(request, response) => {
    const result = await Blog.find({}).populate('user', {username:1, name:1})
    await response.json(result)
  })
  

blogsRouter.post('/', async(request, response, next) => {
    const body = request.body
    let token = request.token

    try{
      console.log(token)
      const decodedToken = jwt.verify(request.token, config.SECRET)
      console.log(decodedToken)
      if(!token || !decodedToken.id){
        return response.status(401).json({error: "invalid token" })
      }
      const user = await User.findById(decodedToken.id)  

      console.log(user.id)

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
      })

      if (blog.likes === null){
        blog.likes = 0
      }
      
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        response.json(result)
    }catch{
        response.status(400)
        next()
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

blogsRouter.delete('/:id', async(request, response) => {
  let token = request.token
  let fullBlog = await Blog.findById(request.params.id)
  let user = fullBlog.user.toString()
 



  try{
    const decodedToken = jwt.verify(token, config.SECRET)
    if(!token || !decodedToken){
      return response.status(401).json({error: 'invalid token'})
    }
    if( user === decodedToken.id){
      const result = await Blog.findByIdAndDelete(request.params.id)
      await response.json(result.toJSON())
    }
    else{
      response.status(401).end("Not authorized to delete this blog")
    }
  }catch{
    response.status(401)
    next()

  }

})

blogsRouter.put('/:id', async (request, response) => {

  const result = await Blog.findByIdAndUpdate(request.params.id, request.bodyc)
  await response.json(result.toJSON())
})





module.exports =  blogsRouter