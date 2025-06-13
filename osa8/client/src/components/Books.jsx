import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [genre, setGenre] = useState(null)

  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre },
    fetchPolicy: 'cache-and-network'
  })

  const genreResult = useQuery(ALL_GENRES, {
    fetchPolicy: 'cache-and-network'
  })

  if (bookResult.loading || genreResult.loading) {
    return <div>loading...</div>
  }

  const books = bookResult.data.allBooks
  const genres = genreResult.data.allGenres

  return (
    <div>
      <h2>books</h2>
      <div>{genre && <div>in genre <b>{genre}</b></div>}</div>
      <div>
        {genres.map(genre => (
          <>
            <button key={genre} onClick={() => setGenre(genre)}>
              {genre}
            </button>
          </>
        ))}
        <button key="showall" onClick={() => setGenre(null)}>
          show all
        </button>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
