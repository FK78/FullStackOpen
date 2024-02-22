const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogsObjects = helper.initalBlogs.map(blog => new Blog(blog))
    const promiseArray = blogsObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('get five blog objects back', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initalBlogs.length)
})

test('verify the unique identifier property is called id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[0])
    expect(response.body[0].id).toBeDefined()
})

test('add a single blog object to the database', async () => {
    const newBlogObject = {
        _id: "5a422a851b54a676234d27f7",
        title: "Google patterns",
        author: "Google Chan",
        url: "https://google.com/",
        likes: 71,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlogObject)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDB()
    expect(blogsAfterPost).toHaveLength(helper.initalBlogs.length + 1)
})


afterAll(async () => {
    await mongoose.connection.close()
  })
