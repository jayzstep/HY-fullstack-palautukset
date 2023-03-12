import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style ={showBlog}>
        {blog.author} <br />
        {blog.url}<br /> 
        likes: {blog.likes} <button onClick={updateLikes}>like</button> <br /> 
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog