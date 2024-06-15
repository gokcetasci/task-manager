import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const TaskList = ({ tasks, deleteTask, editTask }) => {
  return (
    <div id="tasklist">
      <table>
        <thead>
          <th>Title</th>
          <th>Description</th>
          <th>Category</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.category}</td>
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
