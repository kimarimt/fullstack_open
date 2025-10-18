import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

export default function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button text='good' onClick={() => setGood(good + 1)} />
        <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
        <Button text='bad' onClick={() => setBad(bad + 1)} />
      </div>
      <h2>Statistics</h2>
      { good || neutral || bad
        ? <Statistics 
          good={good}
          neutral={neutral}
          bad={bad}
        />
        : <p>No feedback given</p>
      }
    </div>
  )
}