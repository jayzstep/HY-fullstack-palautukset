import axios from 'axios'
const baseUrl = '/api/persons'

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const deletePerson = personID => {
    return axios.delete(baseUrl + "/"+ personID)
}

const update = (personID, oldName, newNumber) => {
    return axios.put(baseUrl + "/" + personID, {name: oldName, number: newNumber})
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {
    create,
    deletePerson,
    update,
    getAll
}