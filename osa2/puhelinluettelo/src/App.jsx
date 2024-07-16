import { useState } from "react";

const Filter = ({ value, handler }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={handler} />
    </div>
  );
};
const Persons = ({ persons, filter }) => {
  const fullList = persons.map((person, i) => (
    <p key={i}>
      {person.name} {person.number}
    </p>
  ));

  const filteredList = persons
    .filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase()),
    )
    .map((person, i) => (
      <p key={i}>
        {person.name} {person.number}
      </p>
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123123" },
    { name: "Testi Testersson", number: "050-36144" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName) !== undefined) {
      window.alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
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
      <Persons persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
