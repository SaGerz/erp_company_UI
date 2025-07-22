import { useState, useEffect } from "react";
import { formatDateToInput } from "../../Utils/formatDateToInput";

export default function ModalEdit({ isOpen, onClose, task, refreshTasks }) {
  const [title, setTitle] = useState(task.judul);
  const [deskripsi, setDeskripsi] = useState(task.deskripsi);
  const [assignedTo, setAssignedTo] = useState(task.assigned_to);
   const [deadline, setDeadline] = useState(formatDateToInput(task.deadline));
  const [userList, setUserList] = useState([]);

  const handleSave = async () => {
    if (!title || !deskripsi || !assignedTo || !deadline) {
      alert("❌ Semua field wajib diisi!");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // JWT token
      const response = await fetch(`http://localhost:5001/api/task-management/update-task/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          judul: title,
          deskripsi,
          assigned_to: assignedTo, // kirim ID
          status: "pending", // misalnya biarkan pending dulu
          deadline,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ Gagal update task: ${data.message}`);
      } else {
        alert("✅ Task berhasil diupdate");
        onClose();        // Tutup modal
        refreshTasks();   // Reload task list
      }
    } catch (err) {
      console.error("Error saat update task:", err);
      alert("Terjadi error saat update task");
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/users/karyawan", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      // Exclude user yang udah assigned
      const users = data.data || [];

      const filteredUsers = users.filter(user => user.id !== task.assigned_to);
      console.log(filteredUsers);
      setUserList(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
    
  fetchUsers();
  }, [task.assigned_to]);

  if (!isOpen) return null;   

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center
    backdrop-blur-sm backdrop-brightness-90 transition-all duration-2500 ease-in-out">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>

        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />

        <label className="block mb-2">Description</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />

        <label className="block mb-2"> Assigned To
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(Number(e.target.value))}
            className="border rounded w-full p-2 mb-4"
          >
            {/* Default assigned user */}
            <option value={task.assigned_to}>
              {task.assigned_name} (Current)
            </option>

            {/* Other users */}
            {userList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2">Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
