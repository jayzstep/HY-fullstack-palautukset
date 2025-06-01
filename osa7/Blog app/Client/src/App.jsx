import { useContext, useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Loginform'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import NotificationContext from './NotificationContext'
import { Notification } from './components/Notification'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [alertMessage, setAlertMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const blogFormRef = useRef()

  const zzzblogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })


  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs))
  // }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (zzzblogs.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = zzzblogs.data

  const handleLike = async (blog) => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    const updatedBlog = await blogService.update(blog.id, blogToUpdate)

    console.log('blog to be updated: ', updatedBlog)
    // setBlogs(
    //   blogs.map((blog) =>
    //     blog.id !== updatedBlog.id ? blog : { ...blog, likes: blog.likes + 1 },
    //   ),
    // )
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null)
  }

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
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
      setBlogs(
        blogs.concat({
          ...response,
          user: { name: user.name, id: response.user },
        }),
      )
      let message = `${response.title} by ${response.author} created!`
      notificationDispatch({ type: 'SET', payload: message })
    } catch (exception) {
      notificationDispatch({ type: 'SET', payload: 'error creating blog' })
    }
  }

  return (
    <div>
      <h1>BlogApp</h1>
      <Notification />
      {!user && <LoginForm setUser={setUser} />}
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
