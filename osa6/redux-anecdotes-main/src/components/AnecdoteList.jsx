import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
  });
  const dispatch = useDispatch();

  const vote = (id, content) => {
    console.log("vote", id);
    dispatch(setNotification(`You voted for '${content}'`))
    dispatch(voteFor(id));
  };

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => a.votes - b.votes)
        .reverse()
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default AnecdoteList;
