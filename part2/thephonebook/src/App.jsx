import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const baseURL = 'http://localhost:3001/persons';
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const getDataHook = () => {
    axios.get(baseURL).then((response) => {
      setPersons(response.data);
    });
  };

  const postData = (nameObject) => {
    axios.post(baseURL, nameObject).then((response) => {
      console.log(response.data)
      setPersons(persons.concat(response.data))
    })
  }

  useEffect(getDataHook, []);

  const addNewName = (event) => {
    event.preventDefault();
    const nameObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    const allNames = persons.map((person) => person.name);
    allNames.includes(newName)
      ? alert(`${newName}, is already added to the phonebook`)
      : postData(nameObject);
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
