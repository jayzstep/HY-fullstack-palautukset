import { TextField, Button } from '@mui/material'

import { useState } from 'react'

const NewBlogForm = ({  toggleVisibility, handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    handleCreate({
      title: title,
      author: author,
      url: url,
      likes: 0

    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="Title"
            value={title}
            name="Title"
            placeholder="blog title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Author"
            value={author}
            name="Author"
            placeholder="John Smith"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Url"
            value={url}
            name="Url"
            placeholder="www.johnsmith.com"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <Button type="submit" name="create">Create</Button>
      </form>
    </div>
  )
}

export default NewBlogForm
