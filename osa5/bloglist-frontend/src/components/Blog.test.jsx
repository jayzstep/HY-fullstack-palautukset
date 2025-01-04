import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'Logic course',
      author: 'Pommi Taju',
      url: 'www.dipdap.fi',
      likes: 7,
      user: {
        username: 'Postman',
        name: 'Postman Pat',
        id: '66a0b50cf9f56572635f924f',
      },
      id: '66a0b5ecf9f56572635f9256',
    }

    const mockLikeHandler = vi.fn()
    const mockHandleRemove = vi.fn()

    container = render(
      <Blog
        blog={blog}
        user={blog.user}
        handleLike={mockLikeHandler}
        handleRemove={mockHandleRemove}
      />,
    ).container

  })

  test('at start the url and likes are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, rest of the info is displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})
