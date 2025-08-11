import Part from './Part'

const Content = ({ parts }) => (
  <>
    {parts.map(part => 
      <Part id={part.id} part={part} />
    )}
  </>
)

export default Content