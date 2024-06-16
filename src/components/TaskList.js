import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const TaskList = ({ tasks, deleteTask, editTask, updateTaskStatus }) => {
    return (
    <div id="tasklist">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Completion Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.category}</td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                >
                  <option value="To Do">To Do</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>{task.status === "Completed" ? new Date(task.completionDate).toLocaleString() : "-"}</td>
              <td>
                <button onClick={() => deleteTask(task)}>
                  <MdDeleteForever />
                </button>
                <button onClick={() => editTask(task)}>
                  <MdEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
