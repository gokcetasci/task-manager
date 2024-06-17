import React, { useState, useEffect } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import Select from "react-select";
import { FcDocument } from "react-icons/fc";

const TaskList = ({ tasks, deleteTask, editTask, updateTaskStatus }) => {
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa numarası
  const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
  const tasksPerPage = 6; // Sayfa başına gösterilecek task sayısı

  // React Select için seçeneklerin listesi
  const statusOptions = [
    { value: "To Do", label: "To Do" },
    { value: "Completed", label: "Completed" },
  ];

  // React Select'te seçenek değiştiğinde
  const handleStatusChange = (selectedOption, taskId) => {
    updateTaskStatus(taskId, selectedOption.value);
  };

  // React Select stil özelleştirmeleri
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.selectProps.value.value === "Completed"
          ? "lightgreen"
          : provided.backgroundColor,
      borderColor: state.isFocused ? "green" : provided.borderColor,
      "&:hover": {
        borderColor: "darkgreen",
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color:
        state.selectProps.value.value === "Completed"
          ? "green"
          : provided.color,
      "&:hover": {
        color: "darkgreen",
      },
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.selectProps.value.value === "Completed"
          ? "green"
          : provided.backgroundColor,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "lightgrey" : provided.backgroundColor,
      color: state.isFocused ? "black" : provided.color,
      "&:hover": {
        backgroundColor: "lightgrey",
        color: "black",
      },
    }),
  };

  // Sayfa numarasını değiştiren işlev
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Task listesinde herhangi bir değişiklik olduğunda toplam sayfa sayısını güncelle
  useEffect(() => {
    const totalPagesCount = Math.ceil(tasks.length / tasksPerPage); // Toplam sayfa sayısını hesapla
    setTotalPages(totalPagesCount); // Toplam sayfa sayısını güncelle

    // Eğer mevcut sayfa numarası, güncellenmiş toplam sayfa sayısından büyükse mevcut sayfa numarasını güncelle
    if (currentPage > totalPagesCount) {
      setCurrentPage(totalPagesCount);
    }
  }, [tasks, currentPage, tasksPerPage]); // tasks, currentPage ve tasksPerPage değiştiğinde useEffect'i tetikle

  // Sayfadaki görevleri belirle
  const indexOfLastTask = currentPage * tasksPerPage; // Son taskin index'i
  const indexOfFirstTask = indexOfLastTask - tasksPerPage; // İlk taskin index'i
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask); // Mevcut sayfadaki taskleri al

  return (
    <div id="tasklist">
      <div className="h-[450px] ">
        <table className="px-5 py-3 text-[16px] rounded-md w-[1100px]">
          <thead className="px-5 py-3 text-gray-800 tracking-wide ">
            <tr className="border-b border-gray-200 font-bold">
              <th className="px-5 py-3 text-center max-w-[100px]">Title</th>
              <th className="px-5 py-3 text-center max-w-[100px]">
                Description
              </th>
              <th className="px-5 py-3 text-center max-w-[100px]">Category</th>
              <th className="px-5 py-3 text-center max-w-[100px]">Status</th>
              <th className="px-5 py-3 text-center max-w-[100px]">
                Completion Date
              </th>
              <th className="px-5 py-3 text-center max-w-[100px]">
                <div className="flex items-center justify-center">
                  <HiDotsVertical className="w-5 h-5" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr
                key={task.id}
                className={`border-b border-gray-200  ${
                  task.status === "Completed"
                    ? "bg-green-100 text-gray-400"
                    : ""
                }`}
              >
                <td className="px-5 py-3 text-center max-w-[100px] text-blue-400 font-bold text-ellipsis overflow-hidden ">
                  {task.title}
                </td>
                <td className="px-5 py-3 text-center max-w-[100px] text-ellipsis overflow-hidden ">
                  {task.description}
                </td>
                <td className="px-5 py-3 text-center max-w-[100px]">
                  {task.category ? task.category : "-"}
                </td>
                <td className="px-5 py-3 text-center max-w-[100px]">
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
                    styles={customStyles}
                    className="w-[150px]"
                  />
                </td>
                <td className="px-5 py-3 text-center max-w-[100px]">
                  {task.status === "Completed"
                    ? new Date(task.completionDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-5 py-3 text-center max-w-[100px]">
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <button>
                      <FcDocument className="fill-blue-500 w-6 h-6 hover:scale-110 transition-all duration-500 ease-in-out transform" />
                    </button>
                    <button onClick={() => editTask(task)}>
                      <MdEdit className="fill-blue-500 w-6 h-6 hover:scale-110 transition-all duration-500 ease-in-out transform" />
                    </button>
                    <button onClick={() => deleteTask(task)}>
                      <MdDeleteForever className="fill-red-500 w-6 h-6 hover:scale-110 transition-all duration-500 ease-in-out transform" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sayfa Numaraları */}
      <div className="flex justify-end mt-4">
        <nav>
          <ul className="flex list-none">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className="mx-1">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-full ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TaskList;
