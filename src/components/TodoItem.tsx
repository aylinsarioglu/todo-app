import type { Todo } from "../App";

type Props = {
  todo: Todo;
};

function TodoItem({ todo }: Props) {
  return <p>{todo.text}</p>;
}

export default TodoItem;
