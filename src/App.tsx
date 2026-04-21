import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput.tsx";
import TodoList from "./components/TodoList.tsx";
import "./App.css";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos) as Todo[];
        setTodos(parsedTodos);
      } catch {
        setTodos([]);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, isLoaded]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  return (
    <main className="app-shell">
      <section className="todo-card">
        <header className="todo-header">
          <h1>Todo App</h1>
          <p className="todo-count">Total tasks: {todos.length}</p>
        </header>
      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
        >
          Completed
        </button>
      </div>
      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
      </section>
    </main>
  );
}

export default App;
