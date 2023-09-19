/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Person from "./Person";
const Persons = ({ namesToShow }) => {
  return (
    <div>
      {namesToShow.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default Persons;
