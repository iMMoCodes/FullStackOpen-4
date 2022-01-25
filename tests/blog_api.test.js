const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2MWU3NTllMmVmZjRiZGJmYWUwN2JiNDMiLCJpYXQiOjE2NDMxMjk0OTh9.cUuBk63ueYLspKKwH8V9XMmWiPWE80cEeaU0LZ3Qzz8',
    })
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 3 blogs', async () => {
  const response = await api.get('/api/blogs').set({
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2MWU3NTllMmVmZjRiZGJmYWUwN2JiNDMiLCJpYXQiOjE2NDMxMjk0OTh9.cUuBk63ueYLspKKwH8V9XMmWiPWE80cEeaU0LZ3Qzz8',
  })
  expect(response.body).toHaveLength(3)
})

test('field to identify blog is named id', async () => {
  const response = await api.get('/api/blogs').set({
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2MWU3NTllMmVmZjRiZGJmYWUwN2JiNDMiLCJpYXQiOjE2NDMxMjk0OTh9.cUuBk63ueYLspKKwH8V9XMmWiPWE80cEeaU0LZ3Qzz8',
  })
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

  const initialBlogs = await api.get('/api/blogs').set({
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2MWU3NTllMmVmZjRiZGJmYWUwN2JiNDMiLCJpYXQiOjE2NDMxMjk0OTh9.cUuBk63ueYLspKKwH8V9XMmWiPWE80cEeaU0LZ3Qzz8',
  })

  await api
    .post('/api/blogs')
    .set({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2MWU3NTllMmVmZjRiZGJmYWUwN2JiNDMiLCJpYXQiOjE2NDMxMjk0OTh9.cUuBk63ueYLspKKwH8V9XMmWiPWE80cEeaU0LZ3Qzz8',
    })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs').set({
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2MWU3NTllMmVmZjRiZGJmYWUwN2JiNDMiLCJpYXQiOjE2NDMxMjk0OTh9.cUuBk63ueYLspKKwH8V9XMmWiPWE80cEeaU0LZ3Qzz8',
  })

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
    .set({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2MWU3NTllMmVmZjRiZGJmYWUwN2JiNDMiLCJpYXQiOjE2NDMxMjk0OTh9.cUuBk63ueYLspKKwH8V9XMmWiPWE80cEeaU0LZ3Qzz8',
    })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs').set({
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2MWU3NTllMmVmZjRiZGJmYWUwN2JiNDMiLCJpYXQiOjE2NDMxMjk0OTh9.cUuBk63ueYLspKKwH8V9XMmWiPWE80cEeaU0LZ3Qzz8',
  })

  expect(response.body.map((blog) => blog.likes)).toBeDefined()
})

test('blog has title and url', async () => {
  const newBlog = {
    author: 'testAuthor',
    url: 'testurl@example.com',
  }

  await api
    .post('/api/blogs')
    .set({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2MWU3NTllMmVmZjRiZGJmYWUwN2JiNDMiLCJpYXQiOjE2NDMxMjk0OTh9.cUuBk63ueYLspKKwH8V9XMmWiPWE80cEeaU0LZ3Qzz8',
    })
    .send(newBlog)
    .expect(400)
})

test('request without token sends right status code', async () => {
  const newBlog = {
    title: 'testBlog',
    author: 'testAuthor',
    url: 'testurl@example.com',
    likes: 15,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})
