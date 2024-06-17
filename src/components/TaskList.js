import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import Select from "react-select";

const TaskList = ({ tasks, deleteTask, editTask, updateTaskStatus }) => {
  // React Select için seçeneklerin listesi
  const statusOptions = [
    { value: "To Do", label: "To Do" },
    { value: "Completed", label: "Completed" },
  ];

  // React Select'te seçenek değiştiğinde
  const handleStatusChange = (selectedOption, taskId) => {
    updateTaskStatus(taskId, selectedOption.value);
  };

  return (
    <div id="tasklist">
      <table className="px-5 py-3 text-[16px] rounded-md">
        <thead className="px-5 py-3 text-gray-800 tracking-wide">
          <tr className="border-b border-gray-200">
            <th className="px-5 py-3 text-center">Title</th>
            <th className="px-5 py-3 text-center">Description</th>
            <th className="px-5 py-3 text-center">Category</th>
            <th className="px-5 py-3 text-center">Status</th>
            <th className="px-5 py-3 text-center">Completion Date</th>
            <th className="px-5 py-3 text-center">
              <div className="flex items-center justify-center">
                <HiDotsVertical className="w-5 h-5" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b border-gray-200">
              <td className="px-5 py-3 text-center">{task.title}</td>
              <td className="px-5 py-3 text-center">{task.description}</td>
              <td className="px-5 py-3 text-center">{task.category}</td>
              <td className="px-5 py-3 text-center">
                <Select
                  value={
                    statusOptions.find(
                      (option) => option.value === task.status
                    ) || statusOptions[0] // Default olarak ilk seçeneği kullanıyoruz (To Do)
                  }
                  onChange={(selectedOption) =>
                    handleStatusChange(selectedOption, task.id)
                  }
                  options={statusOptions}
                />
              </td>
              <td className="px-5 py-3 text-center">
                {task.status === "Completed"
                  ? new Date(task.completionDate).toLocaleDateString()
                  : "-"}
              </td>
              <td className="px-5 py-3 text-center">
                <div className="flex flex-row gap-2 items-center">
                  <button onClick={() => deleteTask(task)}>
                    <MdDeleteForever className="fill-red-500 w-6 h-6 hover:scale-110 transition-all duration-500 ease-in-out transform" />
                  </button>
                  <button onClick={() => editTask(task)}>
                    <MdEdit className="fill-blue-500 w-6 h-6 hover:scale-110 transition-all duration-500 ease-in-out transform" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
