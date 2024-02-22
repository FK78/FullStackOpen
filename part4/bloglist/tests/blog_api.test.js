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

test('likes property defaults to zero if missing', async () => {
    const newBlogObject = {
        _id: "5a533a851b54a676234d27f7",
        title: "Meta",
        author: "Meta",
        url: "https://meta.com/",
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlogObject)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAfterPost = await Blog.find({ title: "Meta" })
    const mappedBlog = blogsAfterPost.map(blog => blog.toJSON())
    expect(mappedBlog[0].likes).toEqual(0)
})

test('send 400 Bad Request if title is missing', async () => {
    const newBlogObject = {
        _id: "5a533a451b54a676234d27f7",
        author: "Amazon",
        url: "https://amazon.com/",
        likes: 50,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlogObject)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const dataAfterPost = await helper.blogsInDB()
    expect(dataAfterPost).toHaveLength(helper.initalBlogs.length);
})

test('send 400 Bad Request if url is missing', async () => {
    const newBlogObject = {
        _id: "1a533a451b54a676234d27f7",
        author: "BookFace",
        title: "BookFace",
        likes: 30,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlogObject)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    const dataAfterPost = await helper.blogsInDB()
    expect(dataAfterPost).toHaveLength(helper.initalBlogs.length);
})

test('should delete single blog post resource using id', async () => {
    const blogs = await helper.blogsInDB()
    const blogAtStart = blogs[0]
    
    await api
        .delete(`/api/blogs/${blogAtStart.id}`)
        .expect(204)
    
    const blogsAfterPost = await helper.blogsInDB()
    expect(blogsAfterPost).toHaveLength(helper.initalBlogs.length - 1)
})

test('should update a single blog posts likes using id', async () => {
    const blogAtStart = await helper.blogsInDB()
    const blogToUpdate = blogAtStart[0]

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 12 })
        .expect(204)
})


afterAll(async () => {
    await mongoose.connection.close()
  })
