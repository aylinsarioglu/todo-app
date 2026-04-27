import { useState } from "react";
import type { Todo } from "../App";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodoText: (id: number, text: string) => void;
  clearCompleted: () => void;
  hasCompletedTodos: boolean;
};

function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  updateTodoText,
  clearCompleted,
  hasCompletedTodos
}: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEditing = () => {
    if (editingId === null) {
      return;
    }

    if (!editText.trim()) {
      cancelEditing();
      return;
    }

    updateTodoText(editingId, editText);
    cancelEditing();
  };

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
      {hasCompletedTodos ? (
        <div className="todo-list-actions">
          <button className="clear-completed-btn" type="button" onClick={clearCompleted}>
            Clear Completed
          </button>
        </div>
      ) : null}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          isEditing={editingId === todo.id}
          editText={editingId === todo.id ? editText : ""}
          setEditText={setEditText}
          startEditing={startEditing}
          saveEditing={saveEditing}
          cancelEditing={cancelEditing}
        />
      ))}
    </div>
  );
}

export default TodoList;
