import { useEffect, useState } from "react";
import Login from "./components/Login.tsx";
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
  const [user, setUser] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedUser = localStorage.getItem("user");

    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos) as Todo[];
        setTodos(parsedTodos);
      } catch {
        setTodos([]);
      }
    }

    if (savedUser) {
      setUser(savedUser);
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

  const login = (username: string) => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      return;
    }

    localStorage.setItem("user", trimmedUsername);
    setUser(trimmedUsername);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
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

  if (!user) {
    return (
      <main className="app-shell">
        <section className="todo-card">
          <header className="todo-header">
            <h1>Welcome Back</h1>
            <p className="todo-count">Sign in to manage your tasks</p>
          </header>
          <Login onLogin={login} />
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="todo-card">
        <header className="todo-header app-header">
          <div>
            <h1>Todo App</h1>
            <p className="todo-count">Total tasks: {todos.length}</p>
          </div>
          <div className="user-actions">
            <span className="username">{user}</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
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
