const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {

    const blog = new Blog(request.body)
    if (!blog.likes) {
        blog.likes = 0
    }

    if (!blog.title || !blog.url) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    //console.log(request.params.id)
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    console.log(request.body)
    const blogWithNewLikes = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogWithNewLikes, { new: true, runValidators: true, context: 'query' })
    console.log(res)
    response.status(200).json(updatedBlog.likes)
})

module.exports = blogsRouter