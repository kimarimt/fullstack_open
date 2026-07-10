import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalFeedback = good + neutral + bad
  const avgFeedback = (good - bad) / totalFeedback
  const positiveFeedback = good / totalFeedback * 100

  return (
    <>
      <div>
        <h2>give feedback</h2>
        <div>
          <button onClick={() => setGood(good + 1)}>good</button>
          <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
          <button onClick={() => setBad(bad + 1)}>bad</button>
        </div>
      </div>
      <div>
        <h2>statistics</h2>
        <p>
          good {good}<br />
          neutral {neutral} <br />
          bad {bad}<br />
          all {totalFeedback}<br />
          average {avgFeedback.toFixed(2)}<br />
          positive {positiveFeedback.toFixed(2)}%
        </p>
      </div>
    </>
  )
}

export default App