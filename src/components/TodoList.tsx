import type { Todo } from "../App";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
};

function TodoList({ todos }: Props) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
