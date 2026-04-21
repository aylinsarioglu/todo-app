import type { Todo } from "../App";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

function TodoList({ todos, toggleTodo, deleteTodo }: Props) {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet</p>;
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
