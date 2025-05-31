import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalVotes = good + neutral + bad
  const average = (good - bad) / totalVotes
  const positive = good / totalVotes * 100

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>
          good
        </button>
        <button onClick={() => setNeutral(neutral + 1)}>
          neutral
        </button>
        <button onClick={() => setBad(bad + 1)}>
          bad
        </button>
      </div>
      <h2>Statistics</h2>
      <p>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}<br />
        all {totalVotes}<br />
        average {average}<br />
        positive {positive}
      </p>
    </>
  )
}

export default App