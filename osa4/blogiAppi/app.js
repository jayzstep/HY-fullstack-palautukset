//require('dotenv').config()
//const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const blogsRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')



const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)



module.exports = app