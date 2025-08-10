const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral
  const average = ((good - bad) / total).toFixed(1)
  const positive = ((good / total) * 100).toFixed()

  return (
    <>
      <h2>statistics</h2>
      { good || neutral || bad 
        ? <p>
            good {good}<br />
            neutral {neutral}<br />
            bad {bad}<br />
            all {total}<br />
            average {average}<br />
            positive {positive}{'%'}<br />
          </p>
        : <p>No feedback given</p>
      }
    </>
  )
}

export default Statistics