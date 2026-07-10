import Content from './components/Content'
import Header from './components/Header'
import Total from './components/Total'

const App = () => {
  const course = 'Half Stack Application Developement'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ]

  return (
    <div>
      <Header course={course} />
      <Content
        part1={parts[0]}
        part2={parts[1]}
        part3={parts[2]}
      />  
      <Total 
        exercise1={parts[0].exercises}
        exercise2={parts[1].exercises}
        exercise3={parts[2].exercises}
      />
    </div>
  )
}

export default App