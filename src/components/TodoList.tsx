import type { Todo } from "../App";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

function TodoList({ todos, toggleTodo, deleteTodo }: Props) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">📝 Henüz görev yok</p>
        <p className="empty-state-subtitle">
          Yeni bir görev ekleyerek başlayabilirsin
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
