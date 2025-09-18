import Part from './Part'

const Content = ({ parts }) => (
  <div>
    {
      parts.map((part, i) => <Part key={i} part={part} />)
    }
  </div>
)

export default Content