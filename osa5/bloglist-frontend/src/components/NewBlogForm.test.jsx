import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> updates parent state', async () => {
  const user = userEvent.setup()
  const mockSetBlogs = vi.fn()
  const mockFlash = vi.fn()
  const mockToggleVisibility = vi.fn()

  render(<NewBlogForm  flash={mockFlash} setBlogs={mockSetBlogs} toggleVisibility={mockToggleVisibility}  />)

  const titleInput = screen.getByPlaceholderText('blog title')
  const authorInput = screen.getByPlaceholderText('John Smith')
  const urlInput = screen.getByPlaceholderText('www.johnsmith.com')
  const sendButton = screen.getByText('Create')

  await user.type(titleInput, 'Teoksen nimi')
  await user.click(sendButton)

  expect(mockFlash.mock.calls).toHaveLength(1)
  // expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
