import React, { useState, useEffect } from "react";
import { MdDeleteForever, MdEdit, MdSearch } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import Select from "react-select";
import { FcDocument } from "react-icons/fc";
import DetailTask from "./DetailTask";

const TaskList = ({ tasks, deleteTask, editTask, updateTaskStatus }) => {
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa numarası
  const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
  const [tasksPerPage, setTasksPerPage] = useState(6); // Sayfa başına gösterilecek task sayısı
  const [showDetail, setShowDetail] = useState(false); // Detayın gösterilip gösterilmeyeceğini tutan state
  const [selectedTask, setSelectedTask] = useState(null); // Gösterilen taskin bilgisi
  const [searchTerm, setSearchTerm] = useState(""); // Arama inputu

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

  const indexOfLastTask = currentPage * tasksPerPage; // Son taskin index'i

  const indexOfFirstTask = indexOfLastTask - tasksPerPage; // İlk taskin index'i

  const currentTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstTask, indexOfLastTask); // Arama işlemi burada gerçekleşiyor

  useEffect(() => {
    // İlk yüklendiğinde mevcut sayfa numarasını 1 olarak ayarla
    setCurrentPage(1);
  }, []);

  // DetailTask'i açan fonksiyon
  const openDetail = (task) => {
    setSelectedTask(task);
    setShowDetail(true);
  };

  // DetailTask'i kapatan fonksiyon
  const closeDetail = () => {
    setShowDetail(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    // Ekran yüksekliğine bağlı olarak sayfa başına gösterilecek görev sayısını güncelleyen fonksiyon
    const updateTasksPerPageHeight = () => {
      const height = window.innerHeight;
      if (height > 1500) {
        setTasksPerPage(20); // Ekran yüksekliği 1500 pikselden büyükse 20 görev göster
      } else if (height > 1200) {
        setTasksPerPage(16); // Ekran yüksekliği 1200 pikselden büyükse 16 görev göster
      } else if (height > 800) {
        setTasksPerPage(9); // Ekran yüksekliği 800 pikselden büyükse 9 görev göster
      } else {
        setTasksPerPage(6); // Ekran yüksekliği 800 pikselden küçükse 6 görev göster
      }
    };
  
    updateTasksPerPageHeight(); // İlk yüklemede fonksiyonu çağır
    window.addEventListener("resize", updateTasksPerPageHeight); // Ekran boyutu değişikliklerini dinle ve fonksiyonu çağır
    return () => window.removeEventListener("resize", updateTasksPerPageHeight); // Bileşen temizlendiğinde event listener'ı kaldır
  }, []);
  
  return (
    <div id="tasklist" className="flex flex-col w-screen md:w-auto">
      <div className="flex absolute top-24 md:top-14 text-[10px] lg:text-[16px] ml-6 md:ml-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 pl-4 mb-4 sm:w-[250px] rounded-lg border-2 border-gray-300 outline-none hover:border-blue-400 transition-all duration-500 ease-in-out transform"
          />
          <MdSearch className="absolute top-2 right-2 w-6 h-6 text-blue-400" />
        </div>
      </div>
      <div className="">
        <table className="px-5 py-3 text-[16px] rounded-md w-full md:w-[600px] lg:w-[800px] xl:w-[1100px] text-[10px] md:text-[12px] xl:text-[16px] overflow-auto md:overflow-scroll">
          <thead className="md:px-5 py-3 text-gray-800 tracking-wide ">
            <tr className="border-b border-gray-200 font-bold">
              <th className="md:px-5 py-3 text-center xl:max-w-[100px]">
                Title
              </th>
              <th className="md:px-5 py-3 text-center xl:max-w-[100px]">
                Description
              </th>
              <th className="md:px-5 py-3 text-center xl:max-w-[100px]">
                Category
              </th>
              <th className="md:px-5 py-3 text-center lg:max-w-[100px]">
                Status
              </th>
              <th className="md:px-5 py-3 text-center xl:max-w-[100px]">
                Completion Date
              </th>
              <th className="md:px-5 py-3 text-center xl:max-w-[100px]">
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
                <td className="md:px-5 py-3 text-center xl:max-w-[100px] text-blue-400 font-bold text-ellipsis overflow-hidden ">
                  {task.title}
                </td>
                <td className="md:px-5 py-3 text-center xl:max-w-[100px] text-ellipsis overflow-hidden ">
                  {task.description}
                </td>
                <td className="md:px-5 py-3 text-center xl:max-w-[100px]">
                  {task.category ? task.category : "-"}
                </td>
                <td className="md:px-5 py-3 text-center xl:max-w-[100px]">
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
                    className="max-w-[150px]"
                  />
                </td>
                <td className="md:px-5 py-3 text-center w-[40px] xl:max-w-[100px]">
                  {task.status === "Completed"
                    ? new Date(task.completionDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="md:px-5 py-3 text-center xl:max-w-[100px]">
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <button onClick={() => openDetail(task)}>
                      <FcDocument className="fill-blue-500 lg:w-6 lg:h-6 hover:scale-110 transition-all duration-500 ease-in-out transform" />
                    </button>

                    <button onClick={() => editTask(task)}>
                      <MdEdit className="fill-blue-500 lg:w-6 lg:h-6 hover:scale-110 transition-all duration-500 ease-in-out transform" />
                    </button>
                    <button onClick={() => deleteTask(task)}>
                      <MdDeleteForever className="fill-red-500 lg:w-6 lg:h-6 hover:scale-110 transition-all duration-500 ease-in-out transform" />
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
          <ul className="flex list-none text-[10px] xl:text-[16px]">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className="mx-1">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-2 lg:px-3 py-1 rounded-full ${
                    currentPage === index + 1
                      ? "bg-blue-400 text-white hover:scale-105 transition-all duration-500 ease-in-out transform "
                      : "bg-gray-200 text-gray-800 hover:scale-105 transition-all duration-500 ease-in-out transform hover:bg-blue-200 "
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {showDetail && selectedTask && (
        <DetailTask task={selectedTask} onClose={closeDetail} />
      )}
    </div>
  );
};

export default TaskList;
