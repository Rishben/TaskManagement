import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import $ from "jquery";
import { fetchTasks, toggleComplete, deleteTask } from "./taskSlice";

function TaskList() {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleToggle = (id, completed) => {
    dispatch(toggleComplete({ id, completed: !completed }));
  };

  const handleDelete = (id) => {
    // jQuery animation for delete
    $(`#task-${id}`).fadeOut(300, () => {
      dispatch(deleteTask(id));
    });
  };

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mt-3" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Tasks</h2>
        <Link to="/add" className="btn btn-primary">Add New Task</Link>
      </div>
      
      {tasks.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No tasks yet. Add some tasks to get started!
        </div>
      ) : (
        <div className="list-group">
          {tasks.map((task) => (
            <div 
              key={task._id} 
              id={`task-${task._id}`} 
              className="list-group-item list-group-item-action mb-2"
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className={task.completed ? "text-decoration-line-through text-muted mb-0" : "mb-0"}>
                  {task.title}
                </h5>
                <span className={`badge ${task.completed ? "bg-success" : "bg-warning text-dark"}`}>
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
              
              <div className="mt-3 d-flex">
                <button 
                  className={`btn ${task.completed ? "btn-outline-secondary" : "btn-success"} btn-sm me-2`}
                  onClick={() => handleToggle(task._id, task.completed)}
                >
                  {task.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <Link to={`/task/${task._id}`} className="btn btn-info btn-sm text-white me-2">
                  View Details
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;