import { newAnecdote } from "../reducers/anecdoteReducer.js"
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer.js";
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {

    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(setNotification(`You added '${content}'`))
    const createdAnecdote = await anecdoteService.createNew(content)
    dispatch(newAnecdote(content));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
