import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNewName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
    };
    const allNames = persons.map(person => person.name)
    allNames.includes(newName) ? alert(`${newName}, is already added to the phonebook`) : setPersons(persons.concat(nameObject));
    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name:{" "}
          <input
            onChange={handleNameChange}
            value={newName}
            aria-label="form"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, id) => (
        <p key={id}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
