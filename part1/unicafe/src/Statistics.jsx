const Statistics = ({ good, neutral, bad }) => {
  const totalVotes = good + neutral + bad
  const average = (good - bad) / totalVotes
  const positive = good / totalVotes * 100

  return (
    <>
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

export default Statistics