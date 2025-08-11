const StatisticLine = ({ text, value }) =>
    <p>{text} {value}{text === 'positive' ? '%' : ''}</p>

export default StatisticLine