import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import NotificationContext from "../NotificationContext";
import { useContext } from "react";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({ type: "SET_NOTIFICATION", payload: `You added ${variables}` });
    },
    onError: () => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: "too short anecdote, must have length 5 or more",
      });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
