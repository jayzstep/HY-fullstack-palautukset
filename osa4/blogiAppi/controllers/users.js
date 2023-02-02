const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})
    response.json(users)
})


usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username || username.length < 3) {
        response.status(400).json({ error: 'username too short' })
        return
    }
    if (!password || password.length < 3) {
        response.status(400).json({ error: 'password too short' })
        return
    }

    const userNameTaken = await User.findOne({ username: username })

    if (userNameTaken) {
        response.status(400).json({ error: 'Username already in use' })
        return
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username: username,
            name: name,
            passwordHash: passwordHash
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    }
})



module.exports = usersRouter