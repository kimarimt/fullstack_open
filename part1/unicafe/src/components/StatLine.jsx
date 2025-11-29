const StatLine = ({ text, value }) => (
  <>
    <span>{text} {value}{text === 'positive' ? '%' : ''}</span>
    <br />
  </>
)

export default StatLine