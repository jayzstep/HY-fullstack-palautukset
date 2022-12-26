const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


const initialBlogs = [
    {
        title: 'Koira ja LAP-metodi',
        author: 'Reeta Holappa',
        url: 'reetanblogi.fi',
        likes: '59686'
    },
    {
        title: 'Jazz-pianon alkeet',
        author: 'Jasse Meripää',
        url: 'jassenblogi.fi',
        likes: '4'
    }
]

//mökillä tulee timeout deletemanyn kohdalla, täytyy kokeilla kotona:
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
}, 30000)


test('returns JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)

})

test('blogs have id instead of _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})


test('blog can be added to /api/blogs', async () => {
    const newBlog = {
        title: 'Koiramaailman kirjanpitoa',
        author: 'Rilke',
        url: 'rilkenblogi.fi',
        likes: '1000000'
    }

    const blogsAtStart = await api.get('/api/blogs')

    const response = await api
        .post('/api/blogs')
        .send(newBlog)

    const blogsAfter = await api.get('/api/blogs')

    expect(blogsAfter.body).toHaveLength(blogsAtStart.body.length + 1)

})

test('if likes is empty, returns 0 likes', async () => {
    const blogNoLikes = {
        title: 'Folke Westin seikkailut',
        author: 'Folke West',
        url: 'bessamemucho.yök',
        likes: null
    }

    const response = await api.post('/api/blogs').send(blogNoLikes)

    expect(response.body.likes).toBe(0)

})

test('returns 400 bad request if title or url is empty', async () => {
    const blogNoTitleAndUrl = {
        title: '',
        author: 'Kille',
        url: '',
        likes: 42
    }

    const response = await api.post('/api/blogs').send(blogNoTitleAndUrl)

    expect(response.status).toBe(400)


})

test('deleting works and retuns status 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]


    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
})

test('updating likes returns correct amount of likes', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 60000

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)
    const blogsAfterUpdating = await Blog.find({})

    expect(blogsAfterUpdating.likes).toBe(60000)
})

afterAll(() => {
    mongoose.connection.close()
})
