import { useState } from "react";
import TodoInput from "./components/TodoInput.tsx";
import TodoList from "./components/TodoList.tsx";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
