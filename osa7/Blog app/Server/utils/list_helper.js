const dummy = blogs => 1

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null

  let mostLikes = 0
  let favorite = null

  blogs.forEach(blog => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes
      favorite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  })
  return favorite
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  let blogAmounts = {}
  let mostBlogs = 0
  let topBlogger = null

  blogs.forEach(blog => {
    if (!blogAmounts[blog.author]) {
      blogAmounts[blog.author] = 0
    }
    blogAmounts[blog.author]++
    if (blogAmounts[blog.author] > mostBlogs) {
      mostBlogs = blogAmounts[blog.author]
      topBlogger = {
        author: blog.author,
        blogs: mostBlogs
      }
    }
  })
  return topBlogger
}

const mostLikes = blogs => {
  if (blogs.length === 0) return null

  let likeAmounts = {}
  let mostLikes = 0
  let topLiked = null

  blogs.forEach(blog => {
    if (!likeAmounts[blog.author]) {
      likeAmounts[blog.author] = 0
    }
    likeAmounts[blog.author] += blog.likes
    if (likeAmounts[blog.author] > mostLikes) {
      mostLikes = likeAmounts[blog.author]
      topLiked = {
        author: blog.author,
        likes: mostLikes
      }
    }
  })
  return topLiked
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
