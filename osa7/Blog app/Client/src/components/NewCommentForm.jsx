import { useState } from 'react'

const NewCommentForm = ({ handleNewComment }) => {
  const [comment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    handleNewComment(comment)
    setComment('')
  }

  return (
    <div>
      <h3>add a comment</h3>
      <form onSubmit={addComment}>
        <div>
          comment
          <input
            type="text"
            value={comment}
            name="comment"
            placeholder="your comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit" name="add">
            send
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewCommentForm
