import { render, screen } from '@testing-library/react'
import BlogItem from './BlogItem'

describe('<BlogItem />', () => {
  const blog = {
    title: 'From unique to cleanups and weak: new low-level tools for efficiency',
    author: 'Michael Knyszek',
    url: 'https://go.dev/blog/cleanups-and-weak',
    likes: 0,
  }

  test('renders blog content without details', async () => {
    render(<BlogItem blog={blog} />)

    const blogItemHeader = screen.getByText(`${blog.title} | ${blog.author}`)
    expect(blogItemHeader).toBeDefined()

    const showButton = screen.getByRole('button', { name: 'show' })
    expect(showButton).toBeDefined()
  })
})
