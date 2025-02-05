import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Task() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/todos/${id}`)
      .then(response => {
        setTodo(response.data);
        setTitle(response.data.title);
      })
      .catch(error => console.error('Error fetching todo:', error));
  }, [id]);

  const deleteTodo = () => {
    axios.delete(`http://localhost:3001/todos/${id}`)
      .then(() => navigate('/'))
      .catch(error => console.error('Error deleting todo:', error));
  };

  const updateTodo = () => {
    axios.put(`http://localhost:3001/todos/${id}`, { title })
      .then(() => setEditing(false))
      .catch(error => console.error('Error updating todo:', error));
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      {editing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={updateTodo}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{todo.title}</h2>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={deleteTodo}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Task;
