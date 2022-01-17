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

// Most Likes
const mostLikes = (blogs) => {
  const array = []
  const authorObject = { author: '', likes: 0 }
  const result = _.groupBy(blogs, 'author')
  _.forEach(result, function (value, key) {
    const likeArrays = value.map((el) => el.likes)
    array.push({
      author: key,
      likes: likeArrays.reduce((acc, curr) => acc + curr, 0),
    })
  })
  for (let i = 0; i < array.length; i++) {
    if (array[i].likes > authorObject.likes) {
      authorObject.author = array[i].author
      authorObject.likes = array[i].likes
    }
  }
  return authorObject
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
