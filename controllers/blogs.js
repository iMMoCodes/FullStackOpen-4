const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (err) {
    console.log(err)
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    if (!blog.title || !blog.url) {
      return response.status(400).end()
    }
    const result = await blog.save()
    response.status(201).json(result)
  } catch (err) {
    console.log(err)
  }
})

module.exports = blogsRouter
