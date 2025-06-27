const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const addBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'add blog' }).click()
  await page.getByTestId('title').fill(blog.title)
  await page.getByTestId('author').fill(blog.author)
  await page.getByTestId('url').fill(blog.url)
  await page.getByRole('button', { name: 'Add' }).click()
}

const createUser = async (request, user) => {
  await request.post(`http://localhost:5173/api/users`, {
    data: {
      name: user.name,
      username: user.username,
      password: user.password,
    }
  })
}

const likeBlog = async (locator) => {
  await locator.getByRole('button', { name: 'like' }).click()
  await locator.waitFor()  
}

export default {
  loginWith,
  addBlog,
  createUser,
  likeBlog
}