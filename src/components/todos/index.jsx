import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../../services/api/todosApi";
import { useState } from "react";

const Todo = () => {
  const [newTodo, setNewTodo] = useState("");

  const queryClient = useQueryClient();

  const {
    isError,
    isLoading,
    error,
    data: todos,
  } = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // Invalidate old cache(todos) and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      // Invalidate old cache(todos) and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate old cache(todos) and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function generateRandomId() {
    const timestamp = Date.now().toString(36); // Convert the current timestamp to base36 string
    const randomString = Math.random().toString(36) // Generate a random string and take only a part of it
    return timestamp + randomString;
  }

  const handleAddTodo = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({
      id: generateRandomId(),
      title: newTodo,
      completed: false,
    });
    setNewTodo("");
  };

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  }
  return (
    <>
      <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>Todo List</h1>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius:"5px" }}
          />
          <button type="submit" style={{ width: "100%", padding: "10px" }}>
            Add Todo
          </button>
        </form>
        <div>
          {content}
          {todos?.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "10px 0",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                background: todo.completed ? "#458321" : "transparent",
              }}
            >
              <p style={{ margin: "0", flex: "1" }}>{todo.title}</p>
              <input
                type="checkbox"
                checked={todo.completed}
                id={todo.id}
                onChange={() => {
                  updateTodoMutation.mutate({
                    ...todo,
                    completed: !todo.completed,
                  });
                }}
                style={{ margin: "0 10px", }}
              />
              <button
                onClick={() => {
                  deleteTodoMutation.mutate({ id: todo.id });
                }}
                style={{ cursor: "pointer" }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;
