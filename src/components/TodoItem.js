import React from 'react';
import { Link } from 'react-router-dom';

function TodoItem({ todo }) {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="todo-item">
      <Link to={`/task/${todo.id}`}>
        {truncateText(todo.title, 30)}
      </Link>
    </div>
  );
}

export default TodoItem;
