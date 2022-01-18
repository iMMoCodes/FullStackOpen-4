const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 3 blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
})

test('field to identify blog is named id', async () => {
  const response = await api.get('/api/blogs')
  for (let i = 0; i < response.body.length; i++) {
    expect(response.body[i].id).toBeDefined()
  }
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'testBlog',
    author: 'testAuthor',
    url: 'testurl@example.com',
    likes: 15,
  }

  const initialBlogs = await api.get('/api/blogs')

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.body.length + 1)
})

test('If no likes given, set likes to 0', async () => {
  const newBlog = {
    title: 'testBlog',
    author: 'testAuthor',
    url: 'testurl@example.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body.map((blog) => blog.likes)).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
