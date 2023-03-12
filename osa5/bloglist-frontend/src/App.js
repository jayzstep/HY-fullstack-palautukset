import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Loginform from './components/Login'
import Newblog from './components/Newblog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.clear()

    blogService.setToken(null)
    setUser(null)

  }

  const handleCreate = async (blogObject) => {
      console.log(user)
      newBlogFormRef.current.toggleVisibility()

      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog)
      setBlogs(blogs.concat({...returnedBlog, user : {name: user.name, id: returnedBlog.user}}))
      setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    
  }

  const handleLike = async (blog) => {
    const id = blog.id
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes : blog.likes + 1,
      user: blog.user.id
    }
    
    const updatedBlog = await blogService.update(id, blogToUpdate)
    
    setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : {...blog, likes: blog.likes + 1} ))
  }

  const handleRemove = async (blog) => {
    const id = blog.id
    
    await blogService.remove(id, blog)
    

    setBlogs(blogs.filter(b => b.id !== id))
  }

  const newBlogFormRef = useRef()

  return (
    <div>
      <Notification message={errorMessage} />
      {!user &&
        <Togglable buttonLabel="Login">
          <Loginform handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        </Togglable>
      }
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="Add new blog" ref={newBlogFormRef}>
          <Newblog handleCreate={handleCreate} />
        </Togglable>
        <h2>Blogs</h2>
        {blogs.sort((a,b) => a.likes - b.likes).reverse().map(blog =>
          <Blog key={blog.id} blog={blog} user={user.name} handleLike={handleLike} handleRemove={handleRemove} />
        )}
      </div>
      }
    </div>
  )
}

export default App