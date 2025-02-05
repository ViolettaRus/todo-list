import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import './App.css';

function App() {
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

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3001/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  const toggleComplete = (id) => {
    const todo = todos.find(t => t.id === id);
    axios.put(`http://localhost:3001/todos/${id}`, { ...todo, completed: !todo.completed })
      .then(() => setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)))
      .catch(error => console.error('Error updating todo:', error));
  };

  const filteredTodos = todos.filter(todo => todo.title.includes(searchTerm));
  const sortedTodos = sortAlphabetically ? filteredTodos.sort((a, b) => a.title.localeCompare(b.title)) : filteredTodos;

  return (
    <div className="App">
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
      <TodoList todos={sortedTodos} onDelete={deleteTodo} onToggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
