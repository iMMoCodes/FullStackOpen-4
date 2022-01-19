const bcrypt = require('bcrypt')
const res = require('express/lib/response')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    response.json(users.map((u) => u.toJSON()))
  } catch (err) {
    console.log(err)
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const users = await User.find({})

    if (users.some((user) => user.username === body.username)) {
      return response.status(400).json('This username is already in use')
    }

    if (!body.username || !body.password) {
      return response.status(400).json('Please provide username and password')
    }
    if (body.username.length < 3 || body.password.length < 3) {
      return response
        .status(400)
        .json('Username and password has to be atleast 3 characters')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (err) {
    console.log(err)
  }
})

module.exports = usersRouter
