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
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default TodoInput;