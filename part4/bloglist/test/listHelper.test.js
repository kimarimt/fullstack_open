import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from './listHelper.js'

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const blogList = [
    {
      _id: '684d993f9bf26703a98d62cf',
      title: '[ On | No ] syntactic support for error handling',
      author: 'Robert Griesemer',
      url: 'https://go.dev/blog/error-syntax',
      likes: 10,
    },
    {
      _id: '684d99e24bd7ef2ed72d3035',
      title: 'More predictable benchmarking with testing.B.Loop',
      author: 'Junyang Shao',
      url: 'https://go.dev/blog/testing-b-loop',
      likes: 5,
    },
    {
      _id: '684d9a8c790945fedc924731',
      title: 'Traversal-resistant file APIs',
      author: 'Damien Neil',
      url: 'https://go.dev/blog/osroot',
      likes: 7,
    },
  ]

  test('when list has only one blog, total likes is equal to the blogs likes', () => {
    const blogs = blogList.slice(0, 1)
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, blogs[0].likes)
  })

  test('returns the total likes of list of blogs', () => {
    const result = listHelper.totalLikes(blogList)
    assert.strictEqual(result, 22)
  })
})
