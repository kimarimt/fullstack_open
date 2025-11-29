const StatLine = ({ text, value }) => (
  <tr>
    <td>{text}</td> 
    <td>{value}{text === 'positive' ? '%' : ''}</td>
  </tr>
)

export default StatLine