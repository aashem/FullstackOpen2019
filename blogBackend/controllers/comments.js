const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/:id/comments', async (request, response) => {
    const result = await Comment.find({}).populate('blog', {id:1})
    return response.json(result)
})

commentsRouter.post('/:id/comments', async (request, response) => {
    let body = request.body
    try{
    let blog = await Blog.findById(request.params.id)
    let comment = new Comment ({
        content: body.content,
        blog: blog.id
    })
    console.log(comment)
    if (comment.content.length < 1){
        response.status(400).end('Too short')
    }
    let result = await comment.save()

    console.log(result)
    blog.comments = blog.comments.concat(result.content)
    result = await blog.save()
    response.json(result)
}catch{
    response.status(400).end('Failed')
}
   


     
})


module.exports = commentsRouter