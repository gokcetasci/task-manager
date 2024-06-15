import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import Modal from "./Modal";
import TaskList from "./TaskList";
import AddCategory from "./AddCategory";

function Homepage() {
  const [tasks, setTasks] = useState([]); // Tasklerin tutulduğu durum
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false); // Task ekleme modalının açık olup olmadığını tutma
  const [categories, setCategories] = useState([]); // Kategorilerin tutulduğu durum
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // Category ekleme modalının açık olup olmadığını tutma

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
    const newTask = { title, description, category }; // Yeni task
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
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}

export default Homepage;
