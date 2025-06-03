import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import NewCommentForm from './NewCommentForm.jsx'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'

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
      <Card>
        <CardContent>
          <Typography>{blog.title}</Typography>
          <Typography>{blog.author}</Typography>
          <a href={blog.url}>{blog.url}</a>
          <Typography>{blog.likes} likes</Typography>
          <Typography>added by {blog.user.name}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={updateLikes}>
            Like
          </Button>
          {blog.user.name === user.name && (
            <Button onClick={removeBlog}>delete blog</Button>
          )}
        </CardActions>
      </Card>
      <h3>Comments</h3>
      {blog.comments && blog.comments.map((c, index) => <p key={index}>{c}</p>)}
      <NewCommentForm handleNewComment={handleNewComment} />
    </div>
  )
}

export default Blog
