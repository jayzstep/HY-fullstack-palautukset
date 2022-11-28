import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const deletePerson = personID => {
    return axios.delete(baseUrl + "/"+ personID)
}

const update = (personID, oldName, newNumber) => {
    return axios.put(baseUrl + "/" + personID, {name: oldName, number: newNumber})
}

export default {
    create,
    deletePerson,
    update
}