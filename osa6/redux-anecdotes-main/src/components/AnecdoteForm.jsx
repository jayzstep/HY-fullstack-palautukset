import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer.js";
import { addAnecdote } from "../reducers/anecdoteReducer.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAnecdote = async (event) => {

    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(setNotification(`You added '${content}'`))
    dispatch(addAnecdote(content))
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
