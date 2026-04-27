import { useState } from "react";

type TodoInputProps = {
  addTodo: (text: string, date?: string) => void;
};

function TodoInput({ addTodo }: TodoInputProps) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addTodo(text, date);
    setText("");
    setDate("");
  };

  return (
    <div className="todo-input-row">
      <input
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleAdd();
          }
        }}
        placeholder="Add todo..."
      />
      <input
        className="todo-date-input"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        aria-label="Görev tarihi seç"
      />
      <button className="add-btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default TodoInput;