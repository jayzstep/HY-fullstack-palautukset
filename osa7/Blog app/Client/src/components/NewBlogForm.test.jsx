import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> updates parent state', async () => {
  const user = userEvent.setup()
  const mockHandleCreate = vi.fn()

  render(<NewBlogForm  handleCreate={mockHandleCreate}  />)

  const titleInput = screen.getByPlaceholderText('blog title')
  const authorInput = screen.getByPlaceholderText('John Smith')
  const urlInput = screen.getByPlaceholderText('www.johnsmith.com')
  const sendButton = screen.getByText('Create')

  await user.type(titleInput, 'Teoksen nimi')
  await user.type(authorInput, 'Tekijä')
  await user.type(urlInput, 'www.osoite.fi')
  await user.click(sendButton)

  const blog = {
    title: 'Teoksen nimi',
    author: 'Tekijä',
    url: 'www.osoite.fi',
    likes: 0
  }

  expect(mockHandleCreate.mock.calls).toHaveLength(1)
  expect(mockHandleCreate.mock.calls[0][0].title).toBe(blog.title)
  expect(mockHandleCreate.mock.calls[0][0].author).toBe(blog.author)
  expect(mockHandleCreate.mock.calls[0][0].url).toBe(blog.url)
  expect(mockHandleCreate.mock.calls[0][0].likes).toBe(0)
})
