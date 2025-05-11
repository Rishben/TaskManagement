import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTaskById, toggleComplete, deleteTask } from './taskSlice';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const task = useSelector(state => 
    state.tasks.find(t => t._id === id)
  );
  const status = useSelector(state => state.status);
  
  useEffect(() => {
    if (!task) {
      dispatch(fetchTaskById(id));
    }
  }, [task, id, dispatch]);
  
  const handleToggle = () => {
    if (task) {
      dispatch(toggleComplete({ id, completed: !task.completed }));
    }
  };
  
  const handleDelete = () => {
    dispatch(deleteTask(id));
    navigate('/');
  };
  
  if (status === 'loading' || !task) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Task Details</h2>
      <div className="card">
        <div className="card-body">
          <h3 className={`card-title ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
            {task.title}
          </h3>
          <p className="card-text">{task.description || 'No description'}</p>
          <p className="card-text">
            <strong>Status:</strong> 
            <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning text-dark'} ms-2`}>
              {task.completed ? 'Completed' : 'Incomplete'}
            </span>
          </p>
          
          <div className="mt-3">
            <button 
              className={`btn ${task.completed ? 'btn-outline-secondary' : 'btn-success'} me-2`}
              onClick={handleToggle}
            >
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button className="btn btn-danger me-2" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;