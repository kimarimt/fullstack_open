const Total = ({ parts }) => {
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)

  return (
    <strong>
      <p>
        total of {total} exercises
      </p>
    </strong>
  )
}

export default Total