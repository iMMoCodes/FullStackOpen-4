const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (req, res, next) => {
  try {
    if (req.token) {
      const decodedToken = jwt.verify(req.token, process.env.SECRET)
      const userFromDB = await User.findById(decodedToken.id)
      req.user = userFromDB
    } else {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
  } catch (err) {
    console.log(err)
  }
  next()
}

module.exports = userExtractor
