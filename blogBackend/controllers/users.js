const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const result = await User.find({}).populate('blogs', { title:1, author:1})
    await response.json(result)
  
    
})

usersRouter.post('/', async (request, response) => {
  
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    if(body.username.length <3 || body.password.length <3){
        return response.status(400).end("error: username and password must be over 3 characters")
    }

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    try{
    const result = await user.save(err => {
        console.log(err)
    })
    
    await response.json(result)
    }catch (exception){
        return response.status(400)
    }
})

usersRouter.get('/:id', async (request, response) => {
    try{
    const result = await User.findById(request.params.id)
    await response.json(result)
    }catch{
        return response.status(400)
    }
})

module.exports = usersRouter