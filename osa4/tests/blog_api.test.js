const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
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

  assert.strictEqual(response.body.length, initialBlogs.length)
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
    likes: 47
  }
  await api.post('/api/blogs').send(newBlog).expect(201)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)

  assert(titles.includes('Kissat'))
})



test('if no likes, likes is 0', async () => {
  const newBlog = {
    title: 'Logic',
    author: 'Pommi Taju',
    url: 'www.logic.net',
    likes: null
  }
  const response = await api.post('/api/blogs').send(newBlog)
  assert.strictEqual(response.body.likes, 0)
})


test('returns 400 bar request if title or url is missing', async () => {
  const noTitleBlog = {
    author: 'Tim-Antti',
    url: 'www.korut.com',
    likes: 999
  }
  const noUrlBlog = {
    title: 'Koruja',
    author: 'Tim-Antti',
    likes: 999
  }

  await api.post('/api/blogs').send(noTitleBlog).expect(400)
  await api.post('/api/blogs').send(noUrlBlog).expect(400)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})
