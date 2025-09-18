const StatisticLine = ({ text, stat }) => (
  <tr>
    <td>{text}</td> 
    <td>{stat}{text === 'positive' ? '%' : ''}</td>
  </tr>
)

export default StatisticLine