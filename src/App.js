import React, { useEffect, useState } from 'react';
import { database } from './firebase';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  useEffect(() => {
    const todosRef = database.ref('todos');
    todosRef.on('value', (snapshot) => {
      const todosData = snapshot.val();
      const todosList = [];
      for (let id in todosData) {
        todosList.push({ id, ...todosData[id] });
      }
      setTodos(todosList);
    });
  }, []);

  const addTodo = () => {
    const todosRef = database.ref('todos');
    const newTodoRef = todosRef.push();
    newTodoRef.set({ title: newTodo, completed: false });
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    const todoRef = database.ref(`todos/${id}`);
    todoRef.remove();
  };

  const toggleComplete = (id) => {
    const todoRef = database.ref(`todos/${id}`);
    todoRef.once('value', (snapshot) => {
      const todo = snapshot.val();
      todoRef.update({ completed: !todo.completed });
    });
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
