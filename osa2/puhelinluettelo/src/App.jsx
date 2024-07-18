import personService from "./services/persons";
import { useState, useEffect } from "react";

const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  const messageStyle = error
    ? {
      color: "red",
      paddingTop: 5,
      padding: "10px",
      fontSize: 15,
      backgroundColor: "#f0f0f0",
      border: "2px solid red",
      borderRadius: "5px",
    }
    : {
      color: "green",
      paddingTop: 5,
      padding: "10px",
      fontSize: 15,
      backgroundColor: "#f0f0f0",
      border: "2px solid green",
      borderRadius: "5px",
    };
  return <div style={messageStyle}>{message}</div>;
};

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
          {person.name} {person.number}
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
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(true);

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
        const personId = persons.filter((person) => person.name === newName)[0]
          .id;
        personService
          .update(personId, personObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.name === response.name
                  ? { ...person, number: newNumber }
                  : person,
              ),
            );
          })
          .catch((error) => {
            setError(true);
            setMessage(`${newName} was already removed from the server `);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
        setError(false);
        setMessage(`Updated number for ${newName}`);
        setNewName("");
        setNewNumber("");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
      return;
    }

    personService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response));
        setNewNumber("");
        setNewName("");
        setError(false);
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setError(true);
        setMessage(`${error.response.data.error}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const deletedPersonId = event.target.value;
    // console.log(persons)
    // console.log(deletedPersonId)
    const deletedPersonName = persons.filter(
      (person) => person.id === deletedPersonId,
    )[0].name;

    if (window.confirm(`Delete ${deletedPersonName}?`)) {
      personService.remove(deletedPersonId).then((response) => {
        setPersons(persons.filter((person) => person.id !== deletedPersonId));
        setError(false);
        setMessage(`Deleted ${deletedPersonName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleFilterChange = (event) => setNewFilter(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
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
