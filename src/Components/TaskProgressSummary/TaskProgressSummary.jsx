import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const TaskProgressSummary = () => {
  const {userRole} = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  
  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/task-management/get-tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setTasks(result.data); // pastiin response.data itu array task
    } catch (error) {
      console.error("Gagal ambil data tugas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskKaryawan = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/task-access/get-task', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      setTasks(result.data); // pastiin response.data itu array task
    } catch (error) {
      console.error("Gagal ambil data tugas:", error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    console.log(userRole);
    if(userRole === "karyawan") {
        fetchTaskKaryawan();
    } else {
        fetchTasks();
    }
  },[userRole]);

  if (loading) return <p>Loading task summary...</p>;

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">📌 Task Progress</h2>
      <p className="mb-2">
        {doneTasks} of {totalTasks} tasks completed
      </p>
      <div className="w-full bg-gray-200 h-4 rounded">
        <div
          className="bg-blue-600 h-4 rounded"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{progressPercentage}% done</p>
    </div>
  );
};

export default TaskProgressSummary;
