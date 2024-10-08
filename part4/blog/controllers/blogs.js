const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../middleware/handleToken')

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const { title, url, author, likes } = request.body

  if (!title || !url) {
    return response.status(422).json({ error: 'title or url missing' })
  }

  const { userId } = request

  try {
    const user = await User.findById(userId)
    const newBlog = new Blog({
      title,
      url,
      author,
      likes,
      user: user._id,
    })

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== request.user.id.toString()) {
      return response.status(403).json({ error: 'only the creator can delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', userExtractor, async (request, response, next) => {
  const { likes } = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true }
    )
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
