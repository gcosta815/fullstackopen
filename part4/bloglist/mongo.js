const mongoose = require('mongoose')
const config = require('./utils/config')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)