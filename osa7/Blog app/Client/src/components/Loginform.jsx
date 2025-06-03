import { useContext } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useState } from 'react'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedInUser),
      )
      blogService.setToken(loggedInUser.token)
      userDispatch({ type: 'SET', payload: loggedInUser })
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
          <TextField
            label="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            name="Username"
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            data-testid="password"
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">Login</Button>
      </form>
    </div>
  )
}

export default LoginForm
