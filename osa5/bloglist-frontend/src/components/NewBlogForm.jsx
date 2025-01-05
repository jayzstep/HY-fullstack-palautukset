import blogService from '../services/blogs'

import { useState } from 'react'

const NewBlogForm = ({ flash, setBlogs, toggleVisibility, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const likes = 0
      const response = await blogService.create({ title, author, url, likes })
      toggleVisibility()
      let newBlog = { title: title, author: author, url: url, likes: 0, user: { name: user.name } }
      setBlogs((blogs) => [...blogs, newBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
      let message = `${response.title} by ${response.author} created!`
      flash(message)
    } catch (exception) {
      flash('error creating blog')
    }
  }


  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            placeholder="blog title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            placeholder="John Smith"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            placeholder="www.johnsmith.com"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm
