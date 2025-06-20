import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from './listHelper.js'

const blogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

test.skip('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe.skip('total likes', () => {
  test('when list has only one blog, total likes is equal to the blogs likes', () => {
    const blogs = blogList.slice(0, 1)
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, blogs[0].likes)
  })

  test('returns the total likes of list of blogs', () => {
    const result = listHelper.totalLikes(blogList)
    assert.strictEqual(result, 48)
  })
})

describe.skip('favorite blog', () => {
  test('when list has only one blog, that blog is returned', () => {
    const blogs = blogList.slice(0, 1)
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[0])
  })

  test('favoriteBlog returns the blog with the most likes', () => {
    const expected = blogList[2]
    const result = listHelper.favoriteBlog(blogList)
    assert.deepStrictEqual(result, expected)
  })

  test('favoriteBlog returns the first blog if there are multiple blogs with the most likes', () => {
    const expected = blogList[2]
    const result = listHelper.favoriteBlog(blogList)
    assert.deepStrictEqual(result, expected)
  })
})

describe.skip('most blogs', () => {
  test('mostBlogs returns the author with the most blogs', () => {
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    const result = listHelper.mostBlogs(blogList)
    assert.deepStrictEqual(result, expected)
  })

  test('mostBlogs returns the first occurence when there are multiple authors with the most blogs', () => {
    const blogs = [
      ...blogList,
      {
        _id: '684ece54b2c5bef0b23bb8b6',
        title: 'Substitution Processes',
        author: 'Edsger W. Dijkstra',
        url: 'https://www.cs.utexas.edu/~EWD/transcriptions/EWD00xx/EWD28.html',
        likes: 2,
        __v: 0,
      },
    ]

    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 3,
    }
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, expected)
  })
})

describe.skip('most likes', () => {
  test('mostLikes returns the author with the most likes across all their blogs', () => {
    const expected = {
      author: 'Robert C. Martin',
      likes: 24,
    }
    const result = listHelper.mostLikes(blogList)
    assert.deepStrictEqual(result, expected)
  })

  test('mostLikes returns the first author that has the most likes if there are multiple authors the most likes', () => {
    const blogs = [...blogList]
    blogs[4].likes -= 7

    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }

    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, expected)
  })
})
