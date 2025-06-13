import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = () => {
  const userResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: {
      genre:
        userResult.data && userResult.data.me
          ? userResult.data.me.favoriteGenre
          : null
    },
    skip: !userResult.data || !userResult.data.me,
    fetchPolicy: 'cache-and-network'
  })

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks
  const favoriteGenre = userResult.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{favoriteGenre}</b>
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

export default Recommendations
