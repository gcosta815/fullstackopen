const express = require('express')
const Blog = require('../models/blog')

const blogRouter = express.Router();

blogRouter.get('/', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
})
  
blogRouter.post('/', (request, response) => {
    const body = request.body
    console.log(body)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
  
    blog.save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => {
            response.status(400).json({ error: error.message })
        })
})

module.exports = blogRouter