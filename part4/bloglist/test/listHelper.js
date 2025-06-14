const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs
    .reduce((prev, curr) => prev + curr.likes, 0)
}

export default {
  dummy,
  totalLikes,
}
