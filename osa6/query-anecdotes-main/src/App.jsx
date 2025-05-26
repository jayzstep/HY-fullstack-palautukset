import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, voteAnecdote } from "./requests";
import { useContext, useEffect } from "react";
import NotificationContext from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext)

  

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });


  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (!result.isSuccess) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const handleVote = (anecdote) => {
    console.log("vote");
    dispatch({type: "SET_NOTIFICATION", payload: `You voted for ${anecdote.content}`})
    voteAnecdoteMutation.mutate(anecdote);
  };

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
