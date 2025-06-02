import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Bloglist = () => {
  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (blogsQuery.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = blogsQuery.data

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    maxWidth: 200,
  }
  return (
    <div>
      <h2>Bloglist</h2>
      <div>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Bloglist
