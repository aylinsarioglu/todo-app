import type { Todo } from "../App";
import { isPast, isToday, parseTodoDate } from "../utils/dateUtils";

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  isEditing: boolean;
  editText: string;
  setEditText: (value: string) => void;
  startEditing: (todo: Todo) => void;
  saveEditing: () => void;
  cancelEditing: () => void;
};

function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  isEditing,
  editText,
  setEditText,
  startEditing,
  saveEditing,
  cancelEditing
}: Props) {
  const parsedDate = parseTodoDate(todo.date);
  const parsedDateTime = parsedDate?.getTime() ?? null;
  const hasValidDate = parsedDateTime !== null;
  const formattedDate = hasValidDate && parsedDate ? parsedDate.toLocaleDateString("tr-TR") : null;
  const isTodayDate = isToday(todo.date);
  const isPastDate = isPast(todo.date);
  const isUpcomingDate = hasValidDate && !isPastDate && !isTodayDate;

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      <div className="todo-main">
        {isEditing ? (
          <input
            className="todo-edit-input"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            onBlur={saveEditing}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                saveEditing();
              }

              if (event.key === "Escape") {
                cancelEditing();
              }
            }}
            autoFocus
          />
        ) : (
          <span
            className={`todo-text ${todo.completed ? "completed" : ""}`}
            onDoubleClick={() => startEditing(todo)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                startEditing(todo);
              }
            }}
          >
            {todo.text}
          </span>
        )}
        {formattedDate ? (
          <div className="todo-meta">
            <span className={`todo-date ${isPastDate ? "past" : ""}`}>
              {formattedDate}
            </span>
            <span
              className={`todo-label ${
                isPastDate ? "overdue" : isTodayDate ? "today" : isUpcomingDate ? "upcoming" : ""
              }`}
            >
              {isPastDate ? "Gecikmiş" : isTodayDate ? "Bugün" : isUpcomingDate ? "Yaklaşan" : ""}
            </span>
          </div>
        ) : null}
      </div>

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
