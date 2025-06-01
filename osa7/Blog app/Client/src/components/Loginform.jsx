import { useContext } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      // setUser(user)
      userDispatch({type: 'SET', payload: loggedInUser})
      setUsername('')
      setPassword('')
      notificationDispatch({ type: 'SET', payload: 'Welcome!' })
    } catch (exception) {
      const message = 'wrong credentials'
      notificationDispatch({ type: 'SET', payload: message })
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            data-testid="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            data-testid="password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
