const StatisticLine = ({ text, value }) => (
  <>
    <span>
      {text} {value} 
      {text === 'positive' ? '%' : ''}
    </span>
    <br />
  </>
)

export default StatisticLine