import { useState } from "react";

type LoginProps = {
  onLogin: (username: string) => void;
};

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (!username.trim()) {
      return;
    }

    onLogin(username);
    setUsername("");
  };

  return (
    <div className="todo-input-row">
      <input
        className="todo-input"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter username"
      />
      <button className="add-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
