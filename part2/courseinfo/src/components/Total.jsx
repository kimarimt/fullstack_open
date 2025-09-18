const Total = ({ parts }) => {
  const total = parts
    .reduce((prev, curr) => prev + curr.exercises, 0)

  return <p>Number of exercises {total}</p>
}

export default Total