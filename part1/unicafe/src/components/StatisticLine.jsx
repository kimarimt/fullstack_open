const StatisticLine = ({ text, stat }) => (
  <div>
    <span>{text} {stat}{text === 'positive' ? '%' : ''}</span>
  </div>
)

export default StatisticLine