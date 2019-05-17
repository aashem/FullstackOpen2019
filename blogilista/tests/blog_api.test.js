const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)  

const initialBlogs = [
    {
    title: "Gary Vaynerchuk's blog",
    author: "Gary Vaynerchuk",
    url: "https://www.garyvaynerchuk.com/",
    likes: 2000,
    },
    {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    },
    {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    }
]

let postNewBlog = new Blog({
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
})

let nullLikesBlog = {
    "title": "test",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "likes": ""

}

let nullTitleUrl = {
    "title": "test2",
    "author": "Robert C. Martin",
    "url": "",
    "likes": ""
}

beforeEach (async () => {
 await Blog.deleteMany({})

 let blogObject = new Blog(initialBlogs[0])
 await blogObject.save()

 blogObject = new Blog(initialBlogs[1])
 await blogObject.save()

 blogObject = new Blog(initialBlogs[2])
 await blogObject.save()
})

describe('basic functionality', () => {
    test('blogs are returned as JSON', async ()=> {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/ )
    })

    test('there are three notes', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })

    test('a specific blog is within returned blogs', async () =>{
        const response = await api.get('/api/blogs')

        const contents = response.body.map(res => res.title)

        expect(contents).toContainEqual("Go To Statement Considered Harmful")
    })
    test('JSON id format is ID not _ID', async () =>{
        const response = await api.get('/api/blogs')

        const contents = response.body.map(res => res.id)

        expect(contents).toBeDefined()
    })
})

describe('POST testing', ()=> {
  
    test('Does POST work', async () => {
        await postNewBlog.save()

        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.length + 1)
    })
    test('Turn null likes into 0 before POST', async () => {
        await api.post('/api/blogs').send(nullLikesBlog)

        const response = await api.get('/api/blogs')
        let notNull = response.body.filter(res => res.title === 'test')
        let likes = notNull.map(z => z.likes)

        expect(Number(likes)).toBe(0)
    })
    test('Respond 400 bad request if null title and url', async ()=> {
        let response = await api.post('/api/blogs').send(nullTitleUrl)
        let status = response.status

    
        
        expect(Number(status)).toBe(400)
    })
})

describe('DELETE testing', ()=> {
    test('Remove entry "React Patterns"', async () => {
        let response = await api.get('/api/blogs')
        let rObject = response.body.filter(res => String(res.title.toLowerCase()) === "react patterns")
        let id = rObject.map(o => o.id)
        await api.delete(`/api/blogs/${id}`)
        response = await api.get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.length -1)
    })
})

afterAll(()=> {
    mongoose.connection.close()
    console.log("disconnected")
})
