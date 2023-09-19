import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const getDataHook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(getDataHook, []);

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
      <Filter onChange={handleSearch} value={search} />
      <h2>Add a new number</h2>
      <PersonForm
        onSubmit={addNewName}
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
      />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} />
    </div>
  );
};

export default App;
