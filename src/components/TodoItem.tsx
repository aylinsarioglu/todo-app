import type { Todo } from "../App";

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px"
      }}
    >
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#b8b8b8" : "#f5f5f5",
          opacity: todo.completed ? 0.7 : 1,
          cursor: "pointer"
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
