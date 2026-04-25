import { useEffect, useState } from "react";
import Login from "./components/Login.tsx";
import Profile from "./components/Profile.tsx";
import TodoInput from "./components/TodoInput.tsx";
import TodoList from "./components/TodoList.tsx";
import "./App.css";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Menu = "tasks" | "completed" | "profile";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMenu, setActiveMenu] = useState<Menu>("tasks");

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

  const completedCount = todos.filter((todo) => todo.completed).length;
  const visibleTodos =
    activeMenu === "completed"
      ? todos.filter((todo) => todo.completed)
      : todos;

  if (!user) {
    return (
      <main className="app-shell">
        <div className="app-container">
          <section className="todo-card">
            <header className="todo-header">
              <h1>Yapılacaklar Listem</h1>
              <p className="app-subtitle">Kendi görevlerini kolayca yönet</p>
              <p className="todo-count">Giriş yaparak devam et</p>
            </header>
            <Login onLogin={login} />
          </section>
        </div>
      </main>
    );
  }

  const avatarLetter = user.charAt(0).toUpperCase();
  const taskCountText = `${todos.length} görev`;

  return (
    <main className="app-shell">
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-brand">Yapılacaklar Listem</div>
          <nav className="sidebar-nav" aria-label="Dashboard Navigation">
            <button
              className={`sidebar-item ${activeMenu === "tasks" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveMenu("tasks")}
            >
              Tasks
            </button>
            <button
              className={`sidebar-item ${activeMenu === "completed" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveMenu("completed")}
            >
              Completed ({completedCount})
            </button>
            <button
              className={`sidebar-item ${activeMenu === "profile" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveMenu("profile")}
            >
              Profile
            </button>
          </nav>
        </aside>
        <section className="main-content">
          <div className="app-container">
            <section className="todo-card">
              {activeMenu === "profile" ? (
                <Profile user={user} onLogout={logout} />
              ) : (
                <>
                  <header className="todo-header app-header">
                    <div className="title-block">
                      <h1>Yapılacaklar Listem</h1>
                      <p className="app-subtitle">Hoş geldin {user} 👋</p>
                      <p className="todo-count">{taskCountText}</p>
                    </div>
                    <div className="user-actions">
                      <div className="user-profile">
                        <span className="avatar" aria-hidden="true">
                          {avatarLetter}
                        </span>
                        <span className="username">{user}</span>
                      </div>
                    </div>
                  </header>
                  <TodoInput addTodo={addTodo} />
                  <TodoList
                    todos={visibleTodos}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                  />
                </>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
