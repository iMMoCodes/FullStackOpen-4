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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
