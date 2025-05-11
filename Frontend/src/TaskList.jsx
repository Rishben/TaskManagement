import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { fetchTasks, toggleComplete, deleteTask } from "./taskSlice";

function TaskList() {
  const navigate = useNavigate();
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
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">My Tasks</h1>
        <button 
          onClick={() => navigate("/add")} 
          className="btn btn-primary"
        >
          Add New Task
        </button>
      </div>
      
      {tasks.length === 0 ? (
        <div className="alert alert-info">
          No tasks yet. Add some tasks to get started!
        </div>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li 
              key={task._id} 
              id={`task-${task._id}`}
              className="list-group-item"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{task.title}</h5>
                  <span 
                    className={`badge ${task.completed ? "bg-success" : "bg-warning"}`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </div>
                <div className="d-flex gap-2">
                  <button
                    onClick={() => handleToggle(task._id, task.completed)}
                    className={`btn btn-sm ${task.completed ? "btn-outline-warning" : "btn-outline-success"}`}
                  >
                    {task.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                  <button
                    onClick={() => navigate(`/task/${task._id}`)}
                    className="btn btn-sm btn-info text-white"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-sm btn-danger"
                    aria-label="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;