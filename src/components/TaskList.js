import React from "react";

function TaskList({ tasks }) {
  return (
    <div id="tasklist">
      <table>
        <thead>
          <th>Title</th>
          <th>Description</th>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;