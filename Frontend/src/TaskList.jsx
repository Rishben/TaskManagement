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
        <button onClick={() => navigate("/add")} className="btn btn-primary">
          Add New Task
        </button>
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
              className="card shadow-sm mb-3 border-0"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5
                      className={`card-title ${
                        task.completed
                          ? "text-decoration-line-through text-muted"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h5>
                    <span
                      className={`badge ${
                        task.completed ? "bg-success" : "bg-warning text-dark"
                      }`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn-close"
                    aria-label="Delete"
                  />
                </div>

                <div className="mt-3 d-flex flex-wrap gap-2">
                  <button
                    className={`btn btn-sm ${
                      task.completed ? "btn-outline-secondary" : "btn-success"
                    }`}
                    onClick={() => handleToggle(task._id, task.completed)}
                  >
                    {task.completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>

                  <button
                    onClick={() => navigate(`/task/${task._id}`)}
                    className="btn btn-sm btn-info text-white"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
