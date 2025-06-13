import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import Notify from './Notify'

const LoginForm = ({ setToken, onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      const message = error.graphQLErrors[0]?.message || 'Login failed'
      setErrorMessage(message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('booksAndAuthors-user-token', token)
      setErrorMessage('')
      if (onClose) {
        onClose()
      }
    }
  }, [result.data, setToken, onClose])

  const submit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    login({ variables: { username, password } })
  }
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
        {onClose && (
          <button type='button' onClick={onClose}>cancel</button>
        )}
      </form>
    </div>
  )

}

export default LoginForm
