import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import Modal from "./Modal";
import TaskList from "./TaskList";

function Homepage() {
  const [tasks, setTasks] = useState([]);//tasklerin tutulduğu durum
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);//task ekleme modalının açık olup olmadığını tutma

  //sayfa yüklendiğinde localden taskleri yükle
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []; // localStorage'dan taskleri al, yoksa boş bir dizi döndür
    setTasks(storedTasks); // taskleri duruma ata
  }, []);


  //tasks durumu her değiştiğinde locale kaydetme
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks)); //JSON string olarak locale kaydet
    }
  }, [tasks]);

  //yeni task ekleme fonksiyonu
  const addTask = (title, description) => {
    const newTask = { title, description }; //yeni task 
    setAddTaskModalOpen(false); //task ekledikten sonra modal kapat
    setTasks([...tasks,newTask]) //yeni taski mevcut tasklere kaydet
  };

  return (
    <div id="homepage">
      <div id="addtasksbutton">
        {/* Task ekleme modalını açma butonu */}
        <button onClick={() => setAddTaskModalOpen(true)}>Add Task</button>
        {/* addTaskModalOpen durumu true ise AddTask componentini içeren Modalı göster */}
        {addTaskModalOpen && (
          <Modal onClose={() => setAddTaskModalOpen(false)}>
            <AddTask addTask={addTask} />
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
