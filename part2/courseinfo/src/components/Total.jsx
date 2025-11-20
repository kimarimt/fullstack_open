const Total = ({ parts }) => 
  <p>
    <strong>
      total of {parts[0].exercises + parts[1].exercises + parts[2].exercises} exercises
    </strong>
  </p>

export default Total