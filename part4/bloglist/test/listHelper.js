const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs
    .reduce((prev, curr) => prev + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs
    .reduce((max, obj) => obj.likes > max.likes ? obj : max, blogs[0])
}

export default {
  dummy,
  totalLikes,
  favoriteBlog,
}
