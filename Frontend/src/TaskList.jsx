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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>My Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add some tasks to get started!</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} id={`task-${task._id}`} className="task-item">
            <h3 className={task.completed ? "completed" : ""}>{task.title}</h3>
            <div>
              <button onClick={() => handleToggle(task._id, task.completed)}>
                {task.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <Link to={`/task/${task._id}`}>
                <button>View</button>
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
