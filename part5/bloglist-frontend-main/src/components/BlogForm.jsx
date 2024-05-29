import React, { useState, useRef } from 'react'
import Toggable from './Toggable'


const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const toggableRef = useRef()

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'title') setNewTitle(value)
    else if (name === 'author') setNewAuthor(value)
    else if (name === 'url') setNewUrl(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    addBlog(blogObject)
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    toggableRef.current.toggleVisibility()
  }

  return (
    <Toggable buttonLabel='create new post' cancelLabel='cancel' ref={toggableRef} >
      <h3>new blog post:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type='text'
            value={newTitle}
            name='title'
            onChange={handleChange}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newAuthor}
            name='author'
            onChange={handleChange}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newUrl}
            name='url'
            onChange={handleChange}
          />
        </div>
        <button type='submit'>
          create
        </button>
      </form>
    </Toggable>
  )
}

export default BlogForm