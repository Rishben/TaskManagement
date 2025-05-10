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
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h2>Task Details</h2>
      <div className="task-item">
        <h3 className={task.completed ? 'completed' : ''}>{task.title}</h3>
        <p>{task.description || 'No description'}</p>
        <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Incomplete'}</p>
        
        <div>
          <button onClick={handleToggle}>
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
          <button onClick={() => navigate('/')}>Back to List</button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;