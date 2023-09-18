/* eslint-disable react/prop-types */
import Header from "./Header";
import Content from "./Content";
import Total from './Total'

const Course = ({ course }) => {
  return (
    <div>
      {course.map((content) => (
        <div key={content.id}>
          <Header course={content.name} />
          <Content parts={content.parts} />
          <Total total={content.parts.reduce((acc, current) => acc + current.exercises, 0)} />
        </div>
      ))}
    </div>
  );
};

export default Course;
