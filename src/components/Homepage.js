import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import Modal from "./Modal";
import TaskList from "./TaskList";
import AddCategory from "./AddCategory";
import ConfirmModal from "./ConfirmModal";
import EditTask from "./EditTask";

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
    const newTask = { id: Date.now(), title, description, category };
    setIsAddTaskModalOpen(false); // Task ekledikten sonra modalı kapat
    setTasks([...tasks, newTask]); // Yeni task'i mevcut tasklere ekle
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
  };

  // Bir task silindiğinde çağrılan fonksiyon
  const deleteTask = (id) => {
    // Task listesini filtreleyerek verilen ID'ye sahip taski listeden çıkar
    setTasks(tasks.filter((task) => task.id !== id));
    // Task onay modalını kapat
    setIsConfirmModalOpen(false);
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
  };

 // Task düzenleme işlemi başlatmak için çağrılan fonksiyon
 const handleEditTask = (task) => {
    setTaskToEdit(task); // Düzenlenecek taski durum değişkenine ata
    setIsEditTaskModalOpen(true); // Düzenleme modalını aç
  };

  
  return (
    <div id="homepage">

      <div id="addtasksbutton">
        {/* Task ekleme modalını açma butonu */}
        <button onClick={() => setIsAddTaskModalOpen(true)}>Add Task</button>
        {/* addTaskModalOpen durumu true ise AddTask componentini içeren Modalı göster */}
        {isAddTaskModalOpen && (
          <Modal onClose={() => setIsAddTaskModalOpen(false)}>
            <AddTask addTask={addTask} categories={categories} />
          </Modal>
        )}
      </div>

      <div id="addcategoriesbutton">
        {/* Kategori ekleme modalını açma butonu */}
        <button onClick={() => setIsCategoryModalOpen(true)}>
          Add Category
        </button>
        {/* setIsCategoryModalOpen durumu true ise AddCategories componentini içeren Modalı göster */}
        {isCategoryModalOpen && (
          <Modal onClose={() => setIsCategoryModalOpen(false)}>
            <AddCategory addCategory={addCategory} />
          </Modal>
        )}
      </div>

      <div id="tasklistsection">
        {/* TaskList ile görevleri listele */}
        <TaskList tasks={tasks} deleteTask={handleDeleteTask} editTask={handleEditTask}/>
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
            <EditTask task={taskToEdit} editTask={editTask} categories={categories} closeModal={() => setIsEditTaskModalOpen(false)}/>
        </Modal>
      )}

    </div>
  );
}

export default Homepage;
