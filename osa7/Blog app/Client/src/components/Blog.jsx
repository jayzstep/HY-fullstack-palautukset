import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import NewCommentForm from './NewCommentForm.jsx'
const Blog = ({ user, handleLike, handleRemove }) => {
  const id = useParams().id

  const queryClient = useQueryClient()

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const addCommentMutation = useMutation({
    mutationFn: (params) =>
      blogService.addBlogComment(params.id, params.comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ querykey: ['blogs'] })
    },
  })

  if (blogsQuery.isLoading) {
    return <div>loading data...</div>
  }
  const blog = blogsQuery.data.find((b) => b.id === id)

  const handleNewComment = (comment) => {
    addCommentMutation.mutate({ id: blog.id, comment })
  }

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
      <h3>Comments</h3>
      {blog.comments && (
        blog.comments.map((c, index) => (
          <p key={index}>{c}</p>
        ))
      )
      }
      <NewCommentForm handleNewComment={handleNewComment} />
    </div>
  )
}

export default Blog
