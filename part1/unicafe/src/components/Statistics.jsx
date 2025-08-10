const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral
  const average = ((good - bad) / total).toFixed(1)
  const positive = ((good / total) * 100).toFixed()

  return (
    <>
      <h2>statistics</h2>
      <p>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}<br />
        all {total}<br />
        average {average}<br />
        positive {positive}{'%'}<br />
      </p>
    </>
  )
}

export default Statistics