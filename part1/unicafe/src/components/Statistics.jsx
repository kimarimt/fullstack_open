import StatisticLine from './StatisticLine'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  return (
    <div>
      <StatisticLine text='good' stat={good} />
      <StatisticLine text='neutral' stat={neutral} />
      <StatisticLine text='bad' stat={bad} />
      <StatisticLine text='all' stat={all} />
      <StatisticLine text='average' stat={average.toFixed(2)} />
      <StatisticLine text='positive' stat={positive.toFixed(0)} />
    </div>
  )
}

export default Statistics