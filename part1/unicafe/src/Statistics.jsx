import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad }) => {
  const totalVotes = good + neutral + bad
  const average = (good - bad) / totalVotes
  const positive = good / totalVotes * 100

  return (
    <>
      <h2>Statistics</h2>
      {good || neutral || bad
        ? <>
          <StatisticLine
            label="good"
            value={good}
          />
          <StatisticLine 
            label="neutral"
            value={neutral}
          />
          <StatisticLine 
            label="bad"
            value={bad}
          />
          <StatisticLine 
            label="all"
            value={totalVotes}
          />
          <StatisticLine 
            label="average"
            value={average}
          />
          <StatisticLine 
            label="positive"
            value={positive}
          />
        </>
        : <p>No feedback given</p>
      }
    </>
  )
}

export default Statistics