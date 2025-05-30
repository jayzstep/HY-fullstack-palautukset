import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map((a) => (a.id !== id ? a : changedAnecdote));
    },
    newAnecdote(state, action) {
      state.push(asObject(action.payload));
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
});

export const { voteFor, newAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    await anecdoteService.createNew(content)
    dispatch(newAnecdote(content))
  }
}

export const addVoteForAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch(voteFor(id))
  }
}
