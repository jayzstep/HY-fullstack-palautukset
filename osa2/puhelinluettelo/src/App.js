import { useState } from 'react'


const Numbers = ({ persons, filterInput }) => {
  const personList = persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  const filteredPersonList = persons.filter(person => person.name.startsWith(filterInput)).map(person => <p key={person.name}>{person.name} {person.number}</p>)
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
      name: 'Arto Hellas',
      number: '040-1231244' 
    },
    {
      name: 'Jasse Merivirta',
      number: '0503686144'
    },
    {
      name: 'Ada Lovelace',
      number: '39-44-5323523'
    },
    {
      name: 'Henrik Roos',
      number: '233368873'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
    setPersons(persons.concat({name: newName, number: newNumber}))

  }
    setNewName('') 
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input onChange={handleFilterChange} value={newFilter} />
          </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons} filterInput={newFilter} />
    </div>
  )

}

export default App
