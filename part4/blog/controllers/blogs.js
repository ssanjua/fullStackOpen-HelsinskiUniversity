const express = require('express');
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blog = await Blog.find({}).populate('user')
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const { title, url, author, likes, userId } = request.body;

  const user = await User.findById(userId)

  if (!title || !url) {
    return response.status(400).json({ error: 'title or url missing' });
  }
  
  const newBlog = new Blog({
    title,
    url,
    author, 
    likes, 
    user: user._id,
  })

  try {
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true }
  )
  response.json(updatedBlog)
})

module.exports = blogRouter