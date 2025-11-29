import StatLine from './StatLine'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  return (
    <>
      <StatLine text='good' value={good} />
      <StatLine text='neutral' value={neutral} />
      <StatLine text='bad' value={bad} />
      <StatLine text='all' value={all} />
      <StatLine text='average' value={average.toFixed(2)} />
      <StatLine text='positive' value={positive.toFixed()} />
    </>
  )
}

export default Statistics