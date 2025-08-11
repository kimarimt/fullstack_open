import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button onClick={() => setGood(good + 1)} label='good' />
        <Button onClick={() => setNeutral(neutral + 1)} label='neutral' />
        <Button onClick={() => setBad(bad + 1)} label='bad' />
      </div>
      <Statistics 
        good={good} 
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App