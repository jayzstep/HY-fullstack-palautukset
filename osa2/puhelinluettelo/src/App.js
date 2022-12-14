import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'




const Notification = ({ message, error }) => {
  
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid"
  }
  if (error) {
    notificationStyle.color = "red"
  }

  if (message === null) {
    return null
  }

  return (
    <div>
      <h1 style={notificationStyle}>{message}</h1>
    </div>
  )
}




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
      number: '123',
      id: '1'
    }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [alertMessage, setAlertMessage] = useState({message: null, error: false})

  useEffect(() => {
    axios
      .get('/api/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
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
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
       
      const updatedPerson = persons.find(person => person.name === newName)
      const updatedPersonId = updatedPerson.id

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(updatedPersonId, newName, newNumber)
          .then(response => setPersons(
            persons.map(person => {
              if (person.name === response.data.name) {
                return (
                  { ...person, number: response.data.number }
                )
              }
              return person
            })
          )).catch(x =>
            setAlertMessage({message: `${newName} has already been removed from server`, error: true})
            )

        setAlertMessage({message: `${newName}'s number updated`, error: false})
        setTimeout(() => {
          setAlertMessage({message: null, error: false})
        }, 3000)
      }
    } else {


      personService
        .create(personObject)
        .then(response => {
          console.log("Moi create personServicesta" + JSON.stringify(response.data))
          setPersons(persons.concat(response.data))
        })
        .then(confirmation =>
          setAlertMessage({message: `Added ${newName}`, error: false}))
        .catch(error => {
          console.log(error.response.data)
          //Tätä täytyy ehkä fiksata:
          setAlertMessage({message: `${JSON.stringify(error.response.data)}`, error: true})
        })

      setTimeout(() => {
        setAlertMessage({message: null, error: false})
      }, 3000)
    }
    setNewName('')
    setNewNumber('')

  }





  const handleDelete = (event) => {
    event.preventDefault()
    const deletedPersonId = event.target.value
    const deletedPersonName = persons.filter(person => person.id === deletedPersonId)

    if (window.confirm(`Delete ${deletedPersonName[0].name} ?`)) {
      personService
        .deletePerson(deletedPersonId)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== deletedPersonId))
        })

      setAlertMessage({message: `${deletedPersonName[0].name} deleted`, error: false})
      setTimeout(() => {
        setAlertMessage({message: null, error: false})
      }, 3000)
    }
  }



  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage.message} error={alertMessage.error} />
      <Filter handler={handleFilterChange} value={newFilter} />
      <h2>Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleName={handleNameChange} handleNumber={handleNumberChange} nameValue={newName} numberValue={newNumber} />
      <Numbers persons={persons} filterInput={newFilter} handleDelete={handleDelete} />
    </div>
  )

}

export default App