import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Loginform'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [alertMessage, setAlertMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const flash = (aMessage) => {
    setAlertMessage(aMessage)
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000)
  }

  const handleLike = async (blog) => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    const updatedBlog = await blogService.update(blog.id, blogToUpdate)

    setBlogs(
      blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : { ...blog, likes: blog.likes + 1 },
      ),
    )
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null)
  }

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  const Notification = ({ message }) => {
    return (
      <div>
        <h3>{message}</h3>
      </div>
    )
  }

  const handleRemove = async (blog) => {
    const id = blog.id

    await blogService.remove(id, blog)

    setBlogs(blogs.filter((b) => b.id !== id))
  }

  const handleCreate = async (blog) => {
    try {
      const response = await blogService.create(blog)
      toggleVisibility()
      setBlogs(blogs.concat({ ...response, user : { name: user.name, id: response.user } }))
      let message = `${response.title} by ${response.author} created!`
      flash(message)
    } catch (exception) {
      flash('error creating blog')
    }
  }

  return (
    <div>
      <h1>BlogApp</h1>
      <Notification message={alertMessage} />
      {!user && <LoginForm flash={flash} setUser={setUser} />}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm
              toggleVisibility={toggleVisibility}
              handleCreate={handleCreate}
            />
          </Togglable>

          <h2>blogs</h2>
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .reverse()
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleLike={handleLike}
                handleRemove={handleRemove}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
