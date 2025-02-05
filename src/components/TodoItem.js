import React from 'react';

function TodoItem({ todo }) {
  return (
    <div className="todo-item">
      <input type="checkbox" checked={todo.completed} readOnly />
      <span>{todo.title}</span>
    </div>
  );
}

export default TodoItem;
