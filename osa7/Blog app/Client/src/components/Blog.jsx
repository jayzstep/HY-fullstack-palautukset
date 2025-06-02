import blogService from '../services/blogs'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

const Blog = ({ user, handleLike, handleRemove }) => {
  const id = useParams().id

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (blogsQuery.isLoading) {
    return <div>loading data...</div>
  }
  const blog = blogsQuery.data.find((b) => b.id === id)


  const updateLikes = (event) => {
    event.preventDefault()
    handleLike(blog)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm('Do you really want to remove ', blog.title)) {
      handleRemove(blog)
    }
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <button onClick={updateLikes}>like</button>
      {blog.user.name === user.name && (
        <button onClick={removeBlog}>delete blog</button>
      )}
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default Blog
