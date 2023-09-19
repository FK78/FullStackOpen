/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Person from "./Person";
const Persons = ({ namesToShow }) => {
console.log(namesToShow)
  return (
    <div>
      {namesToShow.map((person) => (
        <Person id={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default Persons;
