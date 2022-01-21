const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    response.json(blogs)
  } catch (err) {
    console.log(err)
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (!request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })

    if (!blog.title || !blog.url) {
      return response.status(400).end()
    }

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  } catch (err) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json('invalid token')
    }
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    if (!req.token) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(req.params.id)
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (blog.user.toString() !== decodedToken.id) {
      return res
        .status(401)
        .json({ error: 'Only creator of a blog can delete it' })
    }
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json('invalid token')
    }
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  try {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    })
    res.status(200).json(updatedBlog)
  } catch (error) {
    console.log(error)
  }
})

module.exports = blogsRouter
