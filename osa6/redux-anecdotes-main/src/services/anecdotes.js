import axios from "axios";
import { asObject, setAnecdotes } from "../reducers/anecdoteReducer";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = asObject(content)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.get(url)
  const anecdote = response.data

  const updatedAnecdote = {...anecdote, votes: anecdote.votes +1}
  await axios.put(url, updatedAnecdote)
  return response
}

export default { getAll, createNew, voteAnecdote };
