import { useDispatch, useSelector } from "react-redux";
import { addVoteForAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(setNotification(`You voted for '${content}'`));
    dispatch(addVoteForAnecdote(id))
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
              <button onClick={() => vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default AnecdoteList;
