const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const morgan = require('morgan')
require('dotenv').config()

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))







app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => {
    res.json(result)
  })

})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then( person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }})
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))

})

app.post('/api/persons', (req, res, next) => {
  const newContact = req.body

  if (!newContact.name) {
    return res.status(400).send({ error: 'name missing' })
  }

  if (!/\d{2,3}-\d{5,}/.test(newContact.number)) {
    return res.status(400).send({ error: 'Error! Use format dd-dddddd, or ddd-dddddd' })
  }
  /*if (persons.some(person => person.name === newContact.name)) {
        return res.status(400).json({ error: "name must be unique" })
    }*/

  const person = new Person({
    name: newContact.name,
    number: newContact.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  Person.find({})
    .then(array => {
      res.send(`<p>Phonebook has info for ${array.length} people</p> ${Date()}`)
    })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send ({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: `${error.message}` })

  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

