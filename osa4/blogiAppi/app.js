const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')



const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)



module.exports = app