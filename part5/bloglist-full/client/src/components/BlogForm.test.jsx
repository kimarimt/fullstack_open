import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const blog = {
    title: 'Extensible Wasm Applications with Go',
    author: 'Cherry Mui',
    url: 'https://go.dev/blog/wasmexport',
  }

  test.skip('update the parent state and calls addBlog', async () => {
    const addBlog = vi.fn()

    render(<BlogForm addBlog={addBlog} />)
    const addButton = screen.getByRole('button', { name: 'Add' })

    const titleInput = screen.getByLabelText('Title:')
    await userEvent.type(titleInput, blog.title)
    expect(titleInput).toHaveValue(blog.title)

    const authorInput = screen.getByLabelText('Author:')
    await userEvent.type(authorInput, blog.author)
    expect(authorInput).toHaveValue(blog.author)

    const urlInput = screen.getByLabelText('Url:')
    await userEvent.type(urlInput, blog.url)
    expect(urlInput).toHaveValue(blog.url)

    await userEvent.click(addButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(addBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(addBlog.mock.calls[0][0].url).toBe(blog.url)
  })
})