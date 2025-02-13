const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.info('connected to MongoDB')
    })
    .catch((error) => {
        console.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app