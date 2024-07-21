const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Ableton',
    author: 'Jasse Merivirta',
    url: 'www.ableton.fi',
    likes: 15
  },
  {
    title: 'Koirat',
    author: 'Reeta Holopainen',
    url: 'www.rilke.fi',
    likes: 491
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () =>{
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
}
