import type { Todo } from "../App";

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

function TodoItem({ todo, toggleTodo, deleteTodo }: Props) {
  return (
    <div className="todo-item">
      <span
        onClick={() => toggleTodo(todo.id)}
        className={`todo-text ${todo.completed ? "completed" : ""}`}
      >
        {todo.text}
      </span>
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
