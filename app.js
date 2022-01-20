const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      console.log('connected to MongoDB')
    }
  })
  .catch((error) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error('error connecting to MongoDB:', error.message)
    }
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
