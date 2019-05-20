const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


blogsRouter.get('/', async(request, response) => {
    const result = await Blog.find({}).populate('user', {username:1, name:1})
    await response.json(result)
  })
  
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async(request, response) => {
    const body = request.body
    const token = getTokenFrom(request)

    try{
      console.log(token)
      const decodedToken = jwt.verify(token, config.SECRET)
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
    }catch(exception){
        response.status(400)
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

  const result = await Blog.findByIdAndDelete(request.params.id)
  await response.json(result.toJSON())

})

blogsRouter.put('/:id', async (request, response) => {

  const result = await Blog.findByIdAndUpdate(request.params.id, request.bodyc)
  await response.json(result.toJSON())
})





module.exports =  blogsRouter