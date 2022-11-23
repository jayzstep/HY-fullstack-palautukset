import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({ handler, value }) => {
  return (
    <div>
      filter shown with <input onChange={handler} value={value} />
    </div>
  )
}

const PersonForm = ({ handleSubmit, handleName, handleNumber, nameValue, numberValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleName} value={nameValue} />
      </div>
      <div>
        number: <input onChange={handleNumber} value={numberValue} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Numbers = ({ persons, filterInput, handleDelete }) => {
  const personList = persons.map(person => (
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={handleDelete} value={person.id}>delete</button>
    </div>
  ))


  const filteredPersonList = persons
    .filter(person => person.name
      .toLowerCase()
      .startsWith(filterInput.toLowerCase()))
    .map(person =>
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    )

  return (
    <div>
      <h2>Numbers</h2>
      {filterInput === '' ? personList : filteredPersonList}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'asd',
      number: '123'
    }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/db')
      .then(response => {
        setPersons(response.data.persons)
      })
  }, [])



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (event) => {
    event.preventDefault()
    const deletedPersonId = event.target.value
    console.log(deletedPersonId)
    console.log(persons[0].id)
    personService
      .deletePerson(deletedPersonId)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(person => person.id != deletedPersonId))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilterChange} value={newFilter} />
      <h2>Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleName={handleNameChange} handleNumber={handleNumberChange} nameValue={newName} numberValue={newNumber} />
      <Numbers persons={persons} filterInput={newFilter} handleDelete={handleDelete} />
    </div>
  )

}

export default App
