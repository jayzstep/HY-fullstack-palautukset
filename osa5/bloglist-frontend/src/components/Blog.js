import { useState } from "react"

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => (setVisible(!visible))

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  
  const showBlog = {
    display: visible ? '' : 'none'
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
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style ={showBlog}>
        {blog.author} <br />
        {blog.url}<br /> 
        likes: {blog.likes} <button onClick={updateLikes}>like</button> <br /> 
        {blog.user.name} <br />
        {blog.user.name === user && <button onClick={removeBlog}>remove</button>}
        
      </div>
    </div>
  )
}

export default Blog