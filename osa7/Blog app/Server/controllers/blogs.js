const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
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

blogsRouter.post('/:id/comments', async (request, response) => {
  const BlogToComment = await Blog.findById(request.params.id)
  const comment = request.body.comment

  if (!BlogToComment) {
    return response.status(204).json({ error: 'Blog not found' })
  }
  const blog = {
    comments: BlogToComment.comments.concat(comment)
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true
  })
  if (result) {
    response.status(200).json(result)
  } else {
    return response.status(400).json({ error: 'Couldn\'t update blog' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  const user = request.user
  if (!blogToDelete) {
    return response.status(204).json({ error: 'Blog not found' })
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== user.id) {
    return response.status(401).json({
      error: 'only the creator can delete a blog'
    })
  }

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
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
    return response.status(400).json({ error: 'Couldn\'t update blog' })
  }
})

module.exports = blogsRouter
