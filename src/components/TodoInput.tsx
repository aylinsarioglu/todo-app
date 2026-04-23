import { useState } from "react";

type TodoInputProps = {
  addTodo: (text: string) => void;
};

function TodoInput({ addTodo }: TodoInputProps) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addTodo(text);
    setText("");
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
      <button className="add-btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default TodoInput;