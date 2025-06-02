import { useContext, useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Loginform'
import Users from './components/Users'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import NotificationContext from './NotificationContext'
import { Notification } from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from './UserContext'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

const App = () => {
  const queryClient = useQueryClient()

  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)

  const blogFormRef = useRef()

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ querykey: ['blogs'] })
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: (params) => blogService.update(params.id, params.blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ querykey: ['blogs'] })
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ querykey: ['blogs'] })
    },
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  if (blogsQuery.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = blogsQuery.data

  const handleLike = (blog) => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateBlogMutation.mutate({ id: blog.id, blog: blogToUpdate })
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    userDispatch({ type: 'CLEAR' })
  }

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  const handleRemove = (blog) => {
    removeBlogMutation.mutate(blog.id)
  }

  const handleCreate = (blog) => {
    try {
      newBlogMutation.mutate(blog)
      toggleVisibility()
      const message = `${blog.title} by ${blog.author} created!`
      notificationDispatch({ type: 'SET', payload: message })
    } catch (exception) {
      notificationDispatch({ type: 'SET', payload: 'error creating blog' })
    }
  }

  return (
    <div>
      <h1>BlogApp</h1>
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm
              toggleVisibility={toggleVisibility}
              handleCreate={handleCreate}
            />
          </Togglable>

          <Users />

          <h2>blogs</h2>
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .reverse()
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleLike={handleLike}
                handleRemove={handleRemove}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
