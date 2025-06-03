import { useState } from 'react'
import { TextField, Button } from '@mui/material';

const NewCommentForm = ({ handleNewComment }) => {
  const [comment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    handleNewComment(comment)
    setComment('')
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <div>
          <TextField
            label="your comment"
            value={comment}
            name="comment"
            placeholder="your comment.."
            onChange={(event) => setComment(event.target.value)}
          />
          <Button type="submit" name="add">
            send
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewCommentForm
