import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad }) => {
  const totalVotes = good + neutral + bad
  const averageScore = (good - bad) / totalVotes
  const positiveVotes = good / totalVotes * 100

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={totalVotes} />
        <StatisticLine text='average' value={averageScore.toFixed(2)} />
        <StatisticLine text='positive' value={`${positiveVotes.toFixed(2)}%`} />
      </tbody>
    </table>
  )
}

export default Statistics