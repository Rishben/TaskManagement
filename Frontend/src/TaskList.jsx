import $ from "jquery";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTask, fetchTasks, toggleComplete } from "./taskSlice";

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
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger shadow-sm" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0 fw-bold">
          <i className="bi bi-check2-square me-2 text-primary"></i>
          My Tasks
        </h1>
        <button
          onClick={() => navigate("/add")}
          className="btn btn-primary shadow-sm rounded-pill px-4"
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="alert alert-info shadow-sm text-center p-4">
          <i className="bi bi-inbox-fill fs-1 d-block mb-3 text-info"></i>
          <h5>No tasks yet</h5>
          <p className="mb-0">Add some tasks to get started!</p>
        </div>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div className="col-12 mb-3" key={task._id} id={`task-${task._id}`}>
              <div className="card shadow-sm border-0 hover-shadow">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="form-check me-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggle(task._id, task.completed)}
                          id={`checkbox-${task._id}`}
                        />
                        <label 
                          className="form-check-label visually-hidden" 
                          htmlFor={`checkbox-${task._id}`}
                        >
                          Mark as {task.completed ? "incomplete" : "complete"}
                        </label>
                      </div>
                      <div>
                        <h5 className={`mb-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                          {task.title}
                        </h5>
                        <span
                          className={`badge ${
                            task.completed ? "bg-success" : "bg-warning"
                          } rounded-pill`}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => navigate(`/task/${task._id}`)}
                        className="btn btn-sm btn-outline-primary"
                        aria-label="View Details"
                      >
                        <i className="bi bi-eye me-1"></i>
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="btn btn-sm btn-outline-danger"
                        aria-label="Delete"
                      >
                        <i className="bi bi-trash me-1"></i>
                        Delete
                      </button>
                    </div>
                  </div>
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