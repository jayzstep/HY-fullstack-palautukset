const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username || username.length < 3) {
        response.status(400).json({ error: 'username too short' })
    }
    if (!password || password.length < 3) {
        response.status(400).json({ error: 'password too short' })
    }

    const userNameTaken = await User.findOne({username: username})

    if (userNameTaken) {
        response.status(400).json({error: 'Username already in use'})
      
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = await user.save()

        response.status(200).json(savedUser)
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter