import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleTodo, onUpdateTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={() => onToggleTodo(todo._id)}
          onUpdate={onUpdateTodo}
          onDelete={() => onDeleteTodo(todo._id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
