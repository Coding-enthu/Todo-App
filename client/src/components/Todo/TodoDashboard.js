import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { todoAPI } from '../../services/api';
import './Todo.css';

const TodoDashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoAPI.getTodos();
      setTodos(data);
      setError('');
    } catch (error) {
      setError('Failed to fetch todos');
      console.error('Fetch todos error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await todoAPI.createTodo(todoData);
      setTodos([newTodo, ...todos]);
      return { success: true };
    } catch (error) {
      console.error('Add todo error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add todo' 
      };
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await todoAPI.updateTodo(id, todoData);
      setTodos(todos.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
      return { success: true };
    } catch (error) {
      console.error('Update todo error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update todo' 
      };
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const updatedTodo = await todoAPI.toggleTodo(id);
      setTodos(todos.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error('Toggle todo error:', error);
      setError('Failed to toggle todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Delete todo error:', error);
      setError('Failed to delete todo');
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'pending':
        return !todo.completed;
      default:
        return true;
    }
  });

  const todoStats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back, {user?.username}!</h1>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-section">
          <div className="stat-card">
            <h3>{todoStats.total}</h3>
            <p>Total Tasks</p>
          </div>
          <div className="stat-card">
            <h3>{todoStats.pending}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card">
            <h3>{todoStats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>

        <TodoForm onAddTodo={handleAddTodo} />

        {error && <div className="error-message">{error}</div>}

        <div className="todo-section">
          <div className="todo-header">
            <h2>Your Tasks</h2>
            <div className="filter-buttons">
              <button 
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={filter === 'pending' ? 'active' : ''}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          <TodoList 
            todos={filteredTodos}
            onToggleTodo={handleToggleTodo}
            onUpdateTodo={handleUpdateTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoDashboard;
