const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('siikret', 10)
        const user = new User({
            username: 'Root',
            name: 'Testing Test',
            passwordHash: passwordHash
        })

        await user.save()
    })

    test('creating a new user succeeds', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'jmeriv',
            name: 'Jasse Meriv',
            password: 'enkerro'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    })

    test('if username or password too short, returns 400 bad request', async () => {
        const tooShortUsername = {
            username: 'jm',
            name: 'Jasse Meriv',
            password: 'enkerro'
        }
        await api
            .post('/api/users')
            .send(tooShortUsername)
            .expect(400)
    })

    test('if username already exists, returns 400 and error message', async () => {
        const alreadyExists = {
            username: 'Root',
            name: 'Testing Test',
            password: 'dipdip'
        }
        await api
            .post('/api/users')
            .send(alreadyExists)
            .expect(400)
    })
})