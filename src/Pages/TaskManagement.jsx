import React from 'react'
import TaskCard from '../Components/TaskCard/TaskCard';
import TaskCardAtasan from '../Components/TaskCardAtasan/TaskCardAtasan';
import ModalEdit from '../Components/ModalEdit/ModalEdit';
import { useState } from 'react';

const TaskManagement = () => {
    const [userRole, setUserRole] = useState("atasan"); // bisa "atasan" atau "karyawan"
    const [selectedTask, setSelectedTask] = useState(null);

    const tasks = [
    {
      id: 1,
      title: "Membuat Laporan Absensi",
      deskripsi: "Perbaiki semuala laporan absensi agar sesuai dengan apa yang di minta",
      assignedTo: "tikus",
      assignedBy: "Pak Budi",
      deadline: "2025-07-15",
      status: "On Progress",
    },
    {
      id: 2,
      title: "Update Data Karyawan",
      deskripsi: "Update seluruh data karyawan loh ya jangan lupa",
      assignedTo: "tikus",
      assignedBy: "Bu Rina",
      deadline: "2025-07-10",
      status: "Pending",
    },
    {
      id: 3,
      title: "Review SOP HR",
      deskripsi: "Review all data SOP HR per tanggal 12 sampai 21",
      assignedTo: "tikus",
      assignedBy: "Pak Ahmad",
      deadline: "2025-07-20",
      status: "Selesai",
    },
    {
      id: 4,
      title: "Fix API loh ya",
      deskripsi: "Fix api di sini maksudnya bug di bagian service ya!",
      assignedTo: "tikus",
      assignedBy: "Pak Dedy",
      deadline: "2025-07-20",
      status: "Selesai",
    },
    {
      id: 5,
      title: "Fix Bug FE loh ya",
      deskripsi: "Fe bikin bug ga jelas tolong lah ya di fix mas developer ganteng wahay cihuy",
      assignedTo: "tikus",
      assignedBy: "Pak Wahyu",
      deadline: "2025-07-20",
      status: "Selesai",
    },
    {
      id: 6,
      title: "Fix Bug FE loh ya",
      deskripsi: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took ",
      assignedTo: "tikus",
      assignedBy: "Pak Wahyu",
      deadline: "2025-07-20",
      status: "Selesai",
    },
    {
      id: 7,
      title: "Fix Bug FE loh ya",
      assignedTo: "tikus",
      assignedBy: "Pak Wahyu",
      deadline: "2025-07-20",
      status: "Selesai",
    },
  ];

  console.log(userRole);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => 
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
        />
      )}
    </div>
  );
}

export default TaskManagement