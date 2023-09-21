/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Person from "./Person";
const Persons = ({ namesToShow, deletePerson, label }) => {
  return (
    <div>
      {namesToShow.map((person) => (
        <div key={person.id}>
          <Person
            deletePerson={deletePerson}
            label={label}
            name={person.name}
            number={person.number}
            id={person.id}
          />
        </div>
      ))}
    </div>
  );
};

export default Persons;
