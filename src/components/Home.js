import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TodoList from './TodoList';

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:3001/todos', { title: newTodo, completed: false })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo:', error));
    setNewTodo('');
  };

  const filteredTodos = todos.filter(todo => todo.title.includes(searchTerm));
  const sortedTodos = sortAlphabetically ? filteredTodos.sort((a, b) => a.title.localeCompare(b.title)) : filteredTodos;

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Search todos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSortAlphabetically(!sortAlphabetically)}>
        {sortAlphabetically ? 'Sort by default' : 'Sort alphabetically'}
      </button>
      <input
        type="text"
        placeholder="New todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <TodoList todos={sortedTodos} />
    </div>
  );
}

export default Home;
