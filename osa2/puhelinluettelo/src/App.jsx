import axios from "axios";
import personService from "./services/persons";
import { useState, useEffect } from "react";

const Filter = ({ value, handler }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={handler} />
    </div>
  );
};

const Persons = ({ persons, filter, handleDelete }) => {
  const fullList = persons.map((person, i) => (
    <div key={i}>
        {person.name} {person.number} 
      <button onClick={handleDelete} value={person.id}>
        delete
      </button>
    </div>
  ));

  const filteredList = persons
    .filter((person) =>
      person.name
        ? person.name.toLowerCase().includes(filter.toLowerCase())
        : false,
    )
    .map((person, i) => (
      <div key={i}>
        <p>
          {person.name} {person.number}
        </p>
        <button onClick={handleDelete} value={person.id}>
          delete
        </button>
      </div>
    ));

  return (
    <div>
      <h2>Numbers</h2>
      {filter === "" ? fullList : filteredList}
    </div>
  );
};

const Personform = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      // console.log(response)
      setPersons(response);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.find((person) => person.name === newName) !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        const personId = persons.filter(person => person.name === newName)[0].id
        personService
          .update(personId, personObject)
          .then((response) =>
            setPersons(persons.map((person) => person.name === response.name ? {...person, number: newNumber} : person)),
          );
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    personService.create(personObject).then((response) => {
      setPersons(persons.concat(response));
      setNewNumber("");
      setNewName("");
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const deletedPersonId = event.target.value;
    const deletedPersonName = persons.filter(
      (person) => person.id === deletedPersonId,
    )[0].name;
    if (window.confirm(`Delete ${deletedPersonName}?`)) {
      personService.remove(event.target.value).then((response) => {
        setPersons(persons.filter((person) => person.id !== response.id));
      });
    }
  };

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleFilterChange = (event) => setNewFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handler={handleFilterChange} />
      <Personform
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      {persons.length !== 0 ? (
        <Persons
          persons={persons}
          filter={newFilter}
          handleDelete={handleDelete}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
