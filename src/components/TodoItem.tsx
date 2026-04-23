import type { Todo } from "../App";

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
        {todo.text}
      </span>

      <button
        className="delete-btn"
        onClick={(event) => {
          event.stopPropagation();
          deleteTodo(todo.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
