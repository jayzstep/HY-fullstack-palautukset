import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = a => {
    let seen = new Set()
    return a.filter(item => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
}

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('booksAndAuthors-user-token')
  )
  const [showLogin, setShowLogin] = useState(false)
  const client = useApolloClient()
  const navigate = useNavigate()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} was added`)
      client.refetchQueries({
        include: 'active'
      })
    }
  })

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
            <Link to="/recommendations">
              <button>recommendations</button>
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
          <LoginForm setToken={setToken} onClose={() => setShowLogin(false)} />
        </div>
      )}

      <Routes>
        <Route path="/authors" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        {token && <Route path="/add" element={<NewBook />} />}
        {token && (
          <Route path="/recommendations" element={<Recommendations />} />
        )}
        <Route path="/" element={<Authors token={token} />} />
      </Routes>
    </div>
  )
}

export default App
