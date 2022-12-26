const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('siikret', 10)
        const user = new User({
            username: 'Jasse',
            passwordHash
        })

        await user.save()
    })

    test('creating a new user succeeds', async () => {
        const usersAtStart = await User.find({})

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

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart + 1)

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
})