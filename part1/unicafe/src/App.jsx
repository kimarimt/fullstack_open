import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + bad + neutral
  const average = ((good - bad) / total).toFixed(1)
  const positive = ((good / total) * 100).toFixed()

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <h2>statistics</h2>
      <p>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}<br />
        all {total}<br />
        average {average}<br />
        positive {positive}{'%'}<br />
      </p>
    </div>
  )
}

export default App