import { useState } from "react";
import type { FormEvent } from "react";

type LoginProps = {
  onLogin: (username: string) => void;
};

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    if (!username.trim()) {
      return;
    }

    onLogin(username);
    setUsername("");
  };

  return (
    <form className="todo-input-row" onSubmit={handleLogin}>
      <input
        className="todo-input"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter username"
      />
      <button className="add-btn" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
