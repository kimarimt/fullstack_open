import Content from './Content';
import Header from './Header';
import Total from './Total';

export default function Course({ course }) {
  return (
    <div>
      <Header course={course.name} />
      <Content course={course.parts} />
      <Total course={course.parts} />
    </div>
  )
}