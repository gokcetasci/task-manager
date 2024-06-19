import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import Modal from "./Modal";
import TaskList from "./TaskList";
import AddCategory from "./AddCategory";
import ConfirmModal from "./ConfirmModal";
import EditTask from "./EditTask";
import { FaPlus } from "react-icons/fa";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Homepage() {
  const [tasks, setTasks] = useState([]); // Tasklerin tutulduğu durum
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false); // Task ekleme modalının açık olup olmadığını tutma
  const [categories, setCategories] = useState([]); // Kategorilerin tutulduğu durum
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // Category ekleme modalının açık olup olmadığını tutma
  const [taskToDelete, setTaskToDelete] = useState(null); // Task silme işleminin tutulduğu durum
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Task silme işleminin onay modalının açık olup olmadığını tutan durum
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(null); // Tasklerin edit modalının açık olup olmadığını tutan durum 
  const [taskToEdit, setTaskToEdit] = useState(null); // Task editleme işleminin tutulduğu durum


  // Sayfa yüklendiğinde localden taskleri yükle
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []; // localStorage'dan taskleri al, yoksa boş bir dizi döndür
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || []; // localStorage'dan kategorileri al, yoksa boş bir dizi döndür
    setTasks(storedTasks); // Taskleri duruma ata
    setCategories(storedCategories); // Kategorileri duruma ata
  }, []);

  // Tasks durumu her değiştiğinde locale kaydetme
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks)); // JSON string olarak locale kaydet
    }
  }, [tasks]);

  // Kategorilerin durumu her değiştiğinde locale kaydetme
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    } // JSON string olarak locale kaydet
  }, [categories]);

  // Yeni task ekleme fonksiyonu
  const addTask = (title, description, category) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      category,
      status: "To Do",
      completionDate: null,
    };
    setIsAddTaskModalOpen(false); // Task ekledikten sonra modalı kapat
    setTasks([...tasks, newTask]); // Yeni task'i mevcut tasklere ekle
    toast.success("Task added successfully!");
  };

  // Yeni kategori ekleme
  const addCategory = (category) => {
    // Eğer kategori listesinde belirtilen kategori yoksa
    if (!categories.includes(category)) {
      // Yeni kategoriyi mevcut kategorilere ekle ve durumu güncelle
      setCategories([...categories, category]);
    }
    // Kategori ekleme modalını kapat
    setIsCategoryModalOpen(false);
    toast.success("Category added successfully!");

  };

  // Bir task silindiğinde çağrılan fonksiyon
  const deleteTask = (id) => {
    // Task listesini filtreleyerek verilen ID'ye sahip taski listeden çıkar
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks); // Güncellenmiş task listesini state'e set et

    // Task onay modalını kapat
    setIsConfirmModalOpen(false);

    // Local storage'dan da güncellenmiş task listesini kaydet
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task deleted successfully!");

  };

  // Task silme işlemi başlatmak için çağrılan fonksiyon
  const handleDeleteTask = (task) => {
    // Silinecek taski durum değişkenine ata
    setTaskToDelete(task);
    // Silme onay modalını aç
    setIsConfirmModalOpen(true);
  };

  // Silme işlemini onaylamak için çağrılan fonksiyon
  const confirmDeleteTask = () => {
    // Silinecek task varsa
    if (taskToDelete) {
      // Taski sil
      deleteTask(taskToDelete.id);
      // Silinecek taski durum değişkeninden temizle
      setTaskToDelete(null);
    }
  };

  // Task düzenleme fonksiyonu
  const editTask = (id, title, description, category) => {
    setTasks(tasks.map(task => task.id === id ? { id, title, description, category } : task));
    setIsEditTaskModalOpen(false); // Task düzenlendikten sonra modalı kapat
    toast.success("Task edited successfully!");

  };

 // Task düzenleme işlemi başlatmak için çağrılan fonksiyon
 const handleEditTask = (task) => {
    setTaskToEdit(task); // Düzenlenecek taski durum değişkenine ata
    setIsEditTaskModalOpen(true); // Düzenleme modalını aç
  };
  
  // Taskin tamamlandı ya da devam ediliyor durumunu kontrol etmek için eklenen fonksiyon. aynı zamanda ne zaman tamamlandığının bilgisi için. 
  const updateTaskStatus = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id 
          ? {
              ...task, // Mevcut task'in tüm özelliklerini alıyoruz
              status, // status alanını güncelliyoruz
              completionDate:
                status === "Completed" // Eğer status "Completed" ise
                  ? new Date().toISOString() // Tamamlanma tarihini güncel tarih olarak ayarlıyoruz
                  : null, // Değilse tamamlanma tarihini null olarak ayarlıyoruz
            }
          : task // Eğer task'in id'si değiştirmek istediğimiz task'in id'si ile aynı değilse, task'i olduğu gibi bırakıyoruz
      )
    );
    toast.success("Status changed!");
  };

  // Kategori silme işlemini gerçekleştiren fonksiyon
  const deleteCategory = (category) => {
    const updatedCategories = categories.filter((cat) => cat !== category);
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    toast.success("Category deleted successfully!");

  };

  // Kategori düzenleme işlemini gerçekleştiren fonksiyon
  const editCategory = (oldCategory, newCategory) => {
    // Eski kategori adını yeni kategori adı ile değiştirme
    const updatedCategories = categories.map((cat) =>
      cat === oldCategory ? newCategory : cat
    );
    setCategories(updatedCategories);

    // Kategorileri localStorage'a da güncelleme
    localStorage.setItem("categories", JSON.stringify(updatedCategories));

    // Taskleri de yeni kategori adı ile güncelleme
    const updatedTasks = tasks.map((task) =>
      task.category === oldCategory ? { ...task, category: newCategory } : task
    );
    setTasks(updatedTasks);

    // Taskleri localStorage'a da güncelleme
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Category edited successfully!");
  };

  return (
    <div id="homepage" className="flex flex-col md:flex-row h-screen">
      <div className="flex">
      <Header
        setIsCategoryModalOpen={setIsCategoryModalOpen}
        categories={categories}
        deleteCategory={deleteCategory}
        editCategory={editCategory}
      />
      </div>

      <div className="flex flex-col flex-grow mx-0 xl:mx-[50px] ">
        <div
          id="buttons"
          className="flex flex-row items-center justify-end gap-4 py-4 px-6 md:px-12 mt-4 xl:mt-10"
        >
          <div id="addtasksbutton">
            {/* Task ekleme modalını açma butonu */}
            <button
              onClick={() => setIsAddTaskModalOpen(true)}
              className="bg-blue-400 py-2 px-3 rounded-full flex flex-row text-white font-semibold hover:scale-105 transition-all duration-500 ease-out transform sm:mr-12 text-[12px] lg:text-[16px]"
            >
              <span className="mr-7 lg:mr-9">Add New Task</span>
              <span
                className={`absolute -top-1 -right-2 text-white bg-gradient-to-r from-blue-700 to-sky-500 p-2.5 border-4 border-white rounded-full hover:scale-105 transition-all duration-500 ease-out transform`}
              >
                <FaPlus />
              </span>
            </button>
            {/* addTaskModalOpen durumu true ise AddTask componentini içeren Modalı göster */}
            {isAddTaskModalOpen && (
              <Modal onClose={() => setIsAddTaskModalOpen(false)}>
                <AddTask addTask={addTask} categories={categories} />
              </Modal>
            )}
          </div>
        </div>

        <div
          id="tasklistsection"
          className="flex items-center justify-center my-5"
        >
          {/* TaskList ile görevleri listele */}
          <TaskList
            tasks={tasks}
            deleteTask={handleDeleteTask}
            editTask={handleEditTask}
            updateTaskStatus={updateTaskStatus}
          />
        </div>
      </div>

      {/* Silme İşlemi Onay Modal */}
      {isConfirmModalOpen && (
        <ConfirmModal
          onConfirm={confirmDeleteTask}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}

      {/* Task Editleme */}
      {isEditTaskModalOpen && (
        <Modal onClose={() => setIsEditTaskModalOpen(false)}>
          <EditTask
            task={taskToEdit}
            editTask={editTask}
            categories={categories}
            closeModal={() => setIsEditTaskModalOpen(false)}
          />
        </Modal>
      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <Modal onClose={() => setIsCategoryModalOpen(false)}>
          <AddCategory addCategory={addCategory} />
        </Modal>
      )}

      <ToastContainer />
    </div>
  );
}

export default Homepage;
