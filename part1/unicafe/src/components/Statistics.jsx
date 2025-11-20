const Statistics = ({ good, neutral, bad }) => {
  const totalVotes = good + neutral + bad
  const averageScore = (good - bad) / totalVotes
  const positiveVotes = good / totalVotes * 100

  return (
    <p>
      good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {totalVotes}<br />
      average {averageScore.toFixed(2)}<br />
      positive {positiveVotes.toFixed(2)}%
    </p>
  )
}

export default Statistics