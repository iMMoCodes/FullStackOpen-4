const _ = require('lodash')

// Dummy
const dummy = (blogs) => {
  return 1
}

// Total Likes
const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => {
    return blog.likes
  })

  return likes.reduce((acc, curr) => acc + curr, 0)
}

// Highest Likes
const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => {
    return blog.likes
  })
  const highestAmountOfLikes = Math.max(...likes)
  const blogWithHighestLikes = blogs.filter(
    (el) => el.likes === highestAmountOfLikes
  )
  return blogWithHighestLikes[0]
}

// Most Blogs
const mostBlogs = (blogs) => {
  const result = _.countBy(blogs, 'author')
  const authorWithMostBlogs = Object.keys(result)[_.size(result) - 1]
  const amountOfBlogs = Object.values(result)[_.size(result) - 1]
  const authorAndAmountOfBlogs = {
    author: authorWithMostBlogs,
    blogs: amountOfBlogs,
  }
  return authorAndAmountOfBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
