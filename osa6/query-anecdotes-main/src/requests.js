import axios from "axios";

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = content => {
  console.log('tänne asti tuli')
  axios.post(baseUrl, asObject(content)).then(res => res.data)
  
}
