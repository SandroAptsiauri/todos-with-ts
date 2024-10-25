import React, { ChangeEvent, useEffect, useState } from "react";

type Ttodo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

const TodoApp: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useState<Ttodo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY = "aUqt9c4f_4_qYHaUlVpGadJgRJrexGRSRaKhMlN1axeJnmlzUQ";
  const API_URL = "https://crudapi.co.uk/api/v1/todos";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const data: Ttodo[] = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
    setLoading(false);
  };
  console.log(todos);

  const addTodo = async () => {
    if (newTodo.trim() === "") return;

    const todoData = {
      name: newTodo,
      isCompleted: false,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([todoData]),
      });
      if (!response.ok) throw new Error("something went wrong");
      const addedTodo: Ttodo = await response.json();
      setTodos([...todos, addedTodo]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };
  return (
    <div>
      <h1>TODO List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoApp;
