const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad
  const avgFeedback = (good - bad) / totalFeedback
  const positiveFeedback = good / totalFeedback * 100

  return (
    <>
      <h2>statistics</h2>
      <> 
        { good || neutral || bad ?
          (
            <p>
              good {good}<br />
              neutral {neutral} <br />
              bad {bad}<br />
              all {totalFeedback}<br />
              average {avgFeedback.toFixed( 2)}<br />
              positive {positiveFeedback.toFixed(2)}%
            </p>
          ) : <p>No feedback given</p> 
        }
      </>
    </>
  )
}

export default Statistics