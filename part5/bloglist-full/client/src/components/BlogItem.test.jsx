import { render, screen } from '@testing-library/react'
import BlogItem from './BlogItem'

describe('<BlogItem />', () => {
  const blog = {
    title: 'From unique to cleanups and weak: new low-level tools for efficiency',
    author: 'Michael Knyszek',
    url: 'https://go.dev/blog/cleanups-and-weak',
    user: {
      name: 'John Doe',
      username: 'jdoe'
    },
    likes: 0,
  }

  const user = {
    name: 'John Doe',
    username: 'jdoe'
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
    expect(showButton).toBeDefined()
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
})
