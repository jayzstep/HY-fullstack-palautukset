// only:
// npm run test -- --test-only
//
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const bcrypt = require('bcrypt')
const helper = require('./test_helper')

let userId
let token
const api = supertest(app)
const server = supertest.agent(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
  userId = user._id

  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
  token = response.body.token
  server.set('Authorization', `Bearer ${token}`)

  const blog1 = { ...helper.initialBlogs[0], user: userId }
  const blog2 = { ...helper.initialBlogs[1], user: userId }
  let blogObject = new Blog(blog1)
  await blogObject.save()
  blogObject = new Blog(blog2)
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('the first blog is about Ableton', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)
  assert(titles.includes('Ableton'))
})

after(async () => {
  await mongoose.connection.close()
})

test('returned field is id, not _id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  assert(blog.id)
  assert(blog.id !== undefined)
  assert(!('_id' in blog))
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Kissat',
    author: 'Hannu Mautemps',
    url: 'www.kissakissa.fi',
    likes: 47,
    userId: userId
  }
  await server.post('/api/blogs').send(newBlog).expect(201)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(titles.includes('Kissat'))
})

test('if no likes, likes is 0', async () => {
  const newBlog = {
    title: 'Logic',
    author: 'Pommi Taju',
    url: 'www.logic.net',
    likes: null,
    userId: userId
  }
  const response = await server.post('/api/blogs').send(newBlog)
  assert.strictEqual(response.body.likes, 0)
})

test('returns 400 bad request if title or url is missing', async () => {
  const noTitleBlog = {
    author: 'Tim-Antti',
    url: 'www.korut.com',
    likes: 999,
    userId: userId
  }
  const noUrlBlog = {
    title: 'Koruja',
    author: 'Tim-Antti',
    likes: 999,
    userId: userId
  }

  await server.post('/api/blogs').send(noTitleBlog).expect(400)
  await server.post('/api/blogs').send(noUrlBlog).expect(400)

  const response = await helper.blogsInDb()
  assert.strictEqual(response.length, helper.initialBlogs.length)
})

test('deletion of a blog returns code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await server.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(blog => blog.title)

  assert(!titles.includes(blogToDelete.title))
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('updating likes for a blog updates its likes', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 1
  }

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const blogAfterUpdate = blogsAtEnd[0]

  assert.strictEqual(blogToUpdate.likes + 1, blogAfterUpdate.likes)
})
