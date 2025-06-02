import { useQuery, useQueryClient } from '@tanstack/react-query'
import usersService from '../services/users'
import { Link, useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
  })

  if (usersQuery.isLoading) {
    return <div>loading data...</div>
  }
  const user = usersQuery.data.find(u => u.id === id)

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>added blogs</h3>

      <ul>
        {user.blogs.map(
          b => <li key={b.id}>{b.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User
