import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral
  const average = ((good - bad) / total).toFixed(1)
  const positive = ((good / total) * 100).toFixed()

  return (
    <>
      <h2>statistics</h2>
      {good || neutral || bad
        ? (
          <table>
            <tbody>
                <StatisticLine text='good' value={good} />
                <StatisticLine text='neutral' value={neutral} />
                <StatisticLine text='bad' value={bad} />
                <StatisticLine text='all' value={total} />
                <StatisticLine text='average' value={average} />
                <StatisticLine text='positive' value={positive} />
            </tbody>
          </table>
        )
        : <p>No feedback given</p>
      }
    </>
  )
}

export default Statistics