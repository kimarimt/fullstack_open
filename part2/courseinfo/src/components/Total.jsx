export default function Total({ parts }) {
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)
  
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  )
}