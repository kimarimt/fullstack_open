export default function Statistics({ good, neutral, bad }) {
  const totalVotes = good + neutral + bad
  const averageVotes = (good - bad) / totalVotes;
  const positiveVotes = good / totalVotes * 100;

  return (
    <div>
      good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {totalVotes}<br />
      average {averageVotes.toFixed(2)}<br />
      positive {positiveVotes.toFixed(2)}%
    </div>
  )
}