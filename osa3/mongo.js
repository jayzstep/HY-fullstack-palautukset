const mongoose = require('mongoose')

//tsekkaa onko salasana laitettu parametriksi
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
  // 1 implikoi virhettä, 0 on "success"
}

// process.argv on array joka sisältää cmd line parametrit, 0 ja 1 on varattu nodelle, siksi salasana on [2]
const password = process.argv[2]


const url = `mongodb+srv://jassemerivirta:${password}@cluster0.b2qbayi.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })


  person.save().then(result => {
    console.log(`Added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })}

Person.find({}).then(result => {
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})