const Total = ({ parts }) => {
  const totalExercises = parts.reduce((prev, curr) => prev + curr.exercises, 0)

  return (
    <p>
      <strong>total of {totalExercises} exercises</strong>
    </p>
  )
}

export default Total