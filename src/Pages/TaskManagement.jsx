import React, { useState, useEffect } from 'react';
import TaskCard from '../Components/TaskCard/TaskCard';
import TaskCardAtasan from '../Components/TaskCardAtasan/TaskCardAtasan';
import ModalEdit from '../Components/ModalEdit/ModalEdit';
import ModalAdd from '../Components/ModalAdd/ModalAdd';
import { useAuth } from '../Context/AuthContext';

const TaskManagement = () => {
  const { userRole, authLoading } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [filterUser, setFilterUser] = useState('');
  const [filterDeadline, setFilterDeadline] = useState('');
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");


  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/task-management/get-tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal fetch tasks");
      setTasks(data.data || []);
    } catch (error) {
      console.error("❌ Error fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchKaryawanTasks = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/task-access/get-task", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setTasks(data.data || []);
    } catch (error) {
      console.error("❌ Error fetch tugas karyawan:", error.message);
    }
  };

  useEffect(() => {
    if (authLoading || !userRole) return;
    if (userRole === "karyawan") {
      fetchKaryawanTasks();
    } else {
      fetchTasks();
    }
  }, [userRole, authLoading]);

  const fetchAllKaryawan = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/users/karyawan", {
        headers : {Authorization: `Bearer ${token}`}
      });
      const data = await res.json();
      console.log(data.data);
      setUsers(data.data);
    } catch (error) {
      console.error("Gagal ambil data karyawan:", error);
    }
  };

  useEffect(() => {
    console.log(`user Role : ${userRole}`);
    if (authLoading || userRole !== "atasan") return;
    fetchAllKaryawan();
  }, [userRole, authLoading]);

  // Filter data di frontend
  const filteredTasks = tasks.filter(task => {
    let matchUser = filterUser ? task.assigned_name === filterUser : true;
    let matchDeadline = true;

    if (filterDeadline) {
      const today = new Date();
      const deadlineDate = new Date(task.deadline);
      if (filterDeadline === "week") {
        const endOfWeek = new Date();
        endOfWeek.setDate(today.getDate() + 7);
        matchDeadline = deadlineDate >= today && deadlineDate <= endOfWeek;
      } else if (filterDeadline === "month") {
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        matchDeadline = deadlineDate >= today && deadlineDate <= endOfMonth;
      } else if (filterDeadline === "overdue") {
        matchDeadline = deadlineDate < today;
      }
    }

    return matchUser && matchDeadline;
  });

  return (
    <div className="p-3">
      {userRole === "atasan" && (
        <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
          <div className="flex gap-2">
            {/* Filter User */}
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="">Semua Karyawan</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>


            {/* Filter Deadline */}
            <select
              value={filterDeadline}
              onChange={(e) => setFilterDeadline(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="">Semua Deadline</option>
              <option value="week">Minggu Ini</option>
              <option value="month">Bulan Ini</option>
              <option value="overdue">Lewat Deadline</option>
            </select>
          </div>

          {/* Tombol Tambah Task */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
          >
            ➕ Tambah Task
          </button>
        </div>
      )}

      {/* List Task */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) =>
          userRole === "karyawan" ? (
            <TaskCard key={task.id} task={task} />
          ) : (
            <TaskCardAtasan key={task.id} task={task} onEdit={setSelectedTask} />
          )
        )}

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
            refreshTasks={fetchTasks}
          />
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
