import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button>good</button>
      <button>neutral</button>
      <button>bad</button>
      <h2>Statistics</h2>
      <p>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}
      </p>
    </div>
  )
}

export default App