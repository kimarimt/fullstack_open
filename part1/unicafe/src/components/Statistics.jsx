import StatLine from './StatLine';

export default function Statistics({ good, neutral, bad }) {
  const totalVotes = good + neutral + bad
  const averageVotes = (good - bad) / totalVotes;
  const positiveVotes = good / totalVotes * 100;

  return (
    <div>
      <StatLine text='good' value={good} />
      <StatLine text='neutral' value={neutral} />
      <StatLine text='bad' value={bad} />
      <StatLine text='all' value={totalVotes} />
      <StatLine text='average' value={averageVotes.toFixed(2)} />
      <StatLine text='positive' value={positiveVotes.toFixed(2)} />
    </div>
  )
}