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
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="bg-primary text-white p-4 text-center mb-0">
        <h1 className="display-5">Simple Task Manager</h1>
      </div>
      
      {/* Navigation tabs */}
      <div className="row m-0 border-bottom">
        <div className="col-6 p-0">
          <div className="nav-item border-end">
            <button className="btn btn-link text-decoration-none text-dark p-3 w-100 text-start">
              <i className="bi bi-list-task me-2"></i>Tasks
            </button>
          </div>
        </div>
        <div className="col-6 p-0">
          <div className="nav-item">
            <button className="btn btn-link text-decoration-none text-primary p-3 w-100 text-end">
              Add Task <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-4">
        <h2 className="mb-4">My Tasks</h2>
        
        <button 
          onClick={() => navigate("/add")}
          className="btn btn-primary mb-4"
        >
          Add New Task
        </button>

        {tasks.length === 0 ? (
          <div className="text-center p-4">
            <p>No tasks yet. Add some tasks to get started!</p>
          </div>
        ) : (
          <div>
            {tasks.map((task) => (
              <div className="mb-3" key={task._id} id={`task-${task._id}`}>
                <div className="p-2 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-0">{task.title}</h5>
                      <div className="text-muted small mb-2">
                        {task.completed ? "Mark as complete" : "Pending"}
                      </div>
                    </div>
                    <div>
                      <span className="badge bg-secondary me-2">{task.completed ? "Completed" : "Pending"}</span>
                      <button
                        onClick={() => navigate(`/task/${task._id}`)}
                        className="btn btn-sm btn-primary me-1"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;