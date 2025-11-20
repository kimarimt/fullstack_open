import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalVotes = good + neutral + bad
  const averageScore = (good - bad) / totalVotes
  const positiveVotes = good / totalVotes * 100

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>Statistics</h2>
      <p>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}<br />
        all {totalVotes}<br />
        average {averageScore.toFixed(2)}<br />
        positive {positiveVotes.toFixed(2)}%
      </p>
    </div>
  )
}

export default App