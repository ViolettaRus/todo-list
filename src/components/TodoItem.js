import React from 'react';

function TodoItem({ todo, onDelete, onToggleComplete }) {
  return (
    <div className="todo-item">
      <input type="checkbox" checked={todo.completed} onChange={() => onToggleComplete(todo.id)} />
      <span>{todo.title}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
