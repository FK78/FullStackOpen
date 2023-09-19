import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const addNewName = (event) => {
    event.preventDefault();
    const nameObject = {
      id: persons.legnth + 1,
      name: newName,
      number: newNumber,
    };
    const allNames = persons.map((person) => person.name);
    allNames.includes(newName)
      ? alert(`${newName}, is already added to the phonebook`)
      : setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const namesToShow =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        show numbers with: {""}
        <input onChange={handleSearch} value={search} aria-label="enter number you want to search for" />
      </form>
      <h2>Add a new number</h2>
      <form onSubmit={addNewName}>
        <div>
          name:{" "}
          <input
            onChange={handleNameChange}
            value={newName}
            aria-label="enter name"
          />
        </div>
        <div>
          number:{" "}
          <input
            onChange={handleNumberChange}
            value={newNumber}
            aria-label="enter number"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {namesToShow.map((person, id) => (
        <div key={id}>
          <p>
            {person.name} {person.number}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
