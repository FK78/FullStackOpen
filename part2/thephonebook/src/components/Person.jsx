/* eslint-disable react/prop-types */
const Person = ({ name, number, id, deletePerson, label }) => {
  return (
    <div>
      <span>
        {name} {`${number} `}
      </span>
      <button onClick={() => deletePerson(id)}>{label}</button>
    </div>
  );
};

export default Person;
