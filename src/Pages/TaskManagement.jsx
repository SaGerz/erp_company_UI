import React from 'react'
import TaskCard from '../Components/TaskCard/TaskCard';
import TaskCardAtasan from '../Components/TaskCardAtasan/TaskCardAtasan';
import ModalEdit from '../Components/ModalEdit/ModalEdit';
import ModalAdd from '../Components/ModalAdd/ModalAdd';
import { useState, useEffect } from 'react';

const TaskManagement = () => {
  const [userRole, setUserRole] = useState("atasan"); // bisa "atasan" atau "karyawan"
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Untuk Add Modal
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/task-management/get-tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal fetch tasks");
      }

      setTasks(data); // simpan ke state
    } catch (error) {
      console.error("❌ Error fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Fetch otomatis saat komponen mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-3">
      {userRole === "atasan" && (
        <div className="flex justify-end mb-2">
          <button
          onClick={() => setIsAddModalOpen(true)}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer "
          >
          ➕ Tambah Task
          </button>
        </div>
      )}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.data?.map((task) => 
        userRole === "karyawan" ? (
          <TaskCard key={task.id} task={task} />
        ) : 
        (
          <TaskCardAtasan key={task.id} task={task} onEdit={setSelectedTask} />
        )  
      )}

      {/* Modal muncul hanya kalau user atasan & klik edit */}
      {userRole === "atasan" && selectedTask && (
        <ModalEdit
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          task={selectedTask}
          refreshTasks={fetchTasks}
        />
      )}

      {userRole === "atasan" && isAddModalOpen && (
        <ModalAdd
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          refreshTasks = {fetchTasks}
        />
      )}
    </div>
    </div>
  );
}

export default TaskManagement