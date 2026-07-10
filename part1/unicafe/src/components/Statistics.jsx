import StatisticLine from "./StatisticsLine"

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad
  const avgFeedback = ((good - bad) / totalFeedback).toFixed(2)
  const positiveFeedback = (good / totalFeedback * 100).toFixed(2)

  return (
    <>
      <h2>statistics</h2>
      <> 
        { good || neutral || bad ?
          (
            <>
              <StatisticLine text='good' value={good} />
              <StatisticLine text='neutral' value={neutral} />
              <StatisticLine text='bad' value={bad} />
              <StatisticLine text='all' value={totalFeedback} />
              <StatisticLine text='average' value={avgFeedback} />
              <StatisticLine text='positive' value={positiveFeedback} />
            </>
          ) : <p>No feedback given</p> 
        }
      </>
    </>
  )
}

export default Statistics