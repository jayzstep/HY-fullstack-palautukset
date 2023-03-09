import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Loginform from './components/Login'
import Notification from './components/Notification'

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
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
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
  return (
    <div>
      <Notification message={errorMessage} />
      {!user && <Loginform handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
      {user && <div>
        <p>{user.name} logged in</p>
        <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
        </div>}
    </div>
  )
}

export default App