const Total = ({ parts }) => {
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)

  return <p>
    <strong>Number of exercises {total}</strong>
  </p>
}

export default Total