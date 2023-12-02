import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [isAnError, setIsAnError] = useState(null);

  useEffect(() => {
    personService.getAllEntries().then((initalPeople) => {
      setPersons(initalPeople);
    });
  }, []);

  const addNewName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    const allNames = persons.map((person) => person.name);
    const allNumbers = persons.map((person) => person.number);

    if (allNames.includes(newName)) {
      const numberExists = allNumbers.includes(newNumber);
      if (
        !numberExists &&
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const personId = persons.find(({ name }) => name === newName)?.id;
        if (personId) {
          const updatePersonObject = {
            name: newName,
            number: newNumber,
            id: personId,
          };
          personService
            .updateEntry(personId, updatePersonObject)
            .then(
              setPersons(
                persons.map((person) =>
                  person.id !== personId ? person : updatePersonObject
                )
              )
            );
          setMessage(`Updated ${newName}`);
        }
      }
    } else {
      personService.createEntry(nameObject).then((addPerson) => {
        setPersons(persons.concat(addPerson));
        setIsAnError(false)
        setMessage(`Added ${newName}`);
      }).catch(error => {
        setIsAnError(true);
        setMessage(error.response.data.error)
      })
    }
  };

  const deletePerson = (id) => {
    const personToDelete = namesToShow.find((name) => name.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deleteEntry(id)
        .then(setPersons(persons.filter((p) => p.id !== id)), setMessage(`Removed ${newName}`))
        .catch(() => {
          setMessage(
            `${personToDelete.name} has already been deleted from the server`
          );
          setIsAnError(true);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
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
      <Notification message={message} isAnError={isAnError} />
      <Filter onChange={handleSearch} value={search} />
      <h2>Add a new number</h2>
      <PersonForm
        onSubmit={addNewName}
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
      />
      <h2>Numbers</h2>
      <Persons
        namesToShow={namesToShow}
        deletePerson={deletePerson}
        label="delete"
      />
    </div>
  );
};

export default App;
