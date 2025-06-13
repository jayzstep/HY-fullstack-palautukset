import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('booksAndAuthors-user-token'))
  const [showLogin, setShowLogin] = useState(false)
  const client = useApolloClient()
  const navigate = useNavigate()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  return (
    <div>
      <div>
        <Link to="/authors">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>
        {token ? (
          <>
            <Link to="/add">
              <button>add book</button>
            </Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)}>login</button>
        )}
      </div>

      {showLogin && !token && (
        <div>
          <h2>Login</h2>
          <LoginForm 
            setToken={setToken} 
            onClose={() => setShowLogin(false)}
          />
        </div>
      )}

      <Routes>
        <Route path="/authors" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        {token && <Route path="/add" element={<NewBook />} />}
        <Route path="/" element={<Authors token={token} />} />
      </Routes>
    </div>
  )
}

export default App
