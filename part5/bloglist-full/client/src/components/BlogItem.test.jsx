import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogItem from './BlogItem'

describe('<BlogItem />', () => {
  const user = {
    name: 'John Doe',
    username: 'jdoe'
  }

  const blog = {
    title: 'From unique to cleanups and weak: new low-level tools for efficiency',
    author: 'Michael Knyszek',
    url: 'https://go.dev/blog/cleanups-and-weak',
    user,
    likes: 0,
  }
  
  test.skip('renders blog content without details', () => {
    render(
      <BlogItem
        blog={blog}
        user={user}
      />
    )

    const blogItemHeader = screen.getByText(`${blog.title} | ${blog.author}`)
    expect(blogItemHeader).toBeDefined()

    const showButton = screen.getByRole('button', { name: 'show' })
    expect(showButton).toBeVisible()
  })

  test.skip('renders blog details after clicking \'show\' button', async () => {
    render(
      <BlogItem
        blog={blog}
        user={user}
      />
    )

    await screen.getByRole('button', { name: 'show' })
      .click()

    screen.debug()

    const link = screen.getByRole('link', { name: blog.url })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', blog.url)
    expect(link).toHaveTextContent(blog.url)

    const likes = screen.getByText(`likes ${blog.likes}`)
    expect(likes).toBeVisible()
  })

  test.skip('event handler is called twice when like button is clicked twice', async () => {
    const mockHandler = vi.fn()

    render (
      <BlogItem
        blog={blog}
        user={user}
        onEdit={mockHandler}
      />
    )

    await screen.getByRole('button', { name: 'show' })
      .click()

    const user2 = userEvent.setup()
    const button = screen.getByRole('button', { name: 'like' })
    await user2.click(button)
    await user2.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
