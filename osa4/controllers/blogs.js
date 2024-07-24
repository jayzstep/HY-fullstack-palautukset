const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === null ? 0 : body.likes,
    user: user._id
  })

  if (!blog.title || !blog.url) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.findByIdAndDelete(id)

  if (result) {
    response.status(204).end()
  } else {
    return response.status(404).json({ error: 'Blog not found' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const result = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true
  })
  if (result) {
    response.status(200).json(result)
  } else {
    return response.status(400).json({ error: "Couldn't update blog" })
  }
})

module.exports = blogsRouter
