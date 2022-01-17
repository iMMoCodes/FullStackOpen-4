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

module.exports = {
  dummy,
  totalLikes,
}
