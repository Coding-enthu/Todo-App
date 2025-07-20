import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
    });
  };

  const handleSaveEdit = async () => {
    if (!editData.title.trim()) {
      alert('Title is required');
      return;
    }

    const result = await onUpdate(todo._id, editData);
    if (result.success) {
      setIsEditing(false);
    } else {
      alert(result.message);
    }
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const isOverdue = () => {
    if (!todo.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(todo.dueDate);
    return !todo.completed && dueDate < today;
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <div className="todo-edit-form">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            placeholder="Task title"
            className="edit-title"
          />
          
          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
            placeholder="Task description"
            className="edit-description"
            rows="2"
          />
          
          <div className="edit-controls">
            <select
              name="priority"
              value={editData.priority}
              onChange={handleChange}
              className="edit-priority"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
            <input
              type="date"
              name="dueDate"
              value={editData.dueDate}
              onChange={handleChange}
              className="edit-date"
            />
          </div>
          
          <div className="edit-actions">
            <button onClick={handleSaveEdit} className="save-button">
              Save
            </button>
            <button onClick={handleCancelEdit} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="todo-content">
        <div className="todo-main">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
            className="todo-checkbox"
          />
          
          <div className="todo-text">
            <h3 className="todo-title">{todo.title}</h3>
            {todo.description && (
              <p className="todo-description">{todo.description}</p>
            )}
          </div>
          
          <div className="todo-meta">
            <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
              {todo.priority}
            </span>
            {todo.dueDate && (
              <span className="due-date">
                Due: {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>
        
        <div className="todo-actions">
          <button onClick={handleEdit} className="edit-button">
            Edit
          </button>
          <button onClick={onDelete} className="delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
