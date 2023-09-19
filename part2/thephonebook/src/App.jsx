import { useState } from "react";
import PersonForm  from "./components/PersonForm";
import Filter from './components/Filter'
import Persons from './components/Persons'

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

  // console.log(namesToShow)


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
      <Filter onChange={handleSearch} value={search}/>
      <h2>Add a new number</h2>
      <PersonForm
        onSubmit={addNewName}
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
      />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow}/>
    </div>
  );
};

export default App;
