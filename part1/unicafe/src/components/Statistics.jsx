const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  return (
    <span>
      good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {all}<br />
      average {average.toFixed(2)}<br />
      positive {positive.toFixed()}%
    </span>
  )
}

export default Statistics