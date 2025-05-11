import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { addTask } from './taskSlice';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      // jQuery effect for validation
      $('#title').css('border-color', 'red').effect('shake', { times: 2, distance: 5 }, 300);
      return;
    }
    
    dispatch(addTask({ title, description }));
    navigate('/');
  };
  
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            placeholder="Enter task description"
          ></textarea>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">Add Task</button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;