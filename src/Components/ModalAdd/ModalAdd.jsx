import { useEffect, useState } from "react";
import FailedAlert from "../Alert/AlertFailed";
import SuccessAlert from "../Alert/AlertSuccess";

export default function ModalAdd({ isOpen, onClose, refreshTasks }) {
  const [title, setTitle] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState("");
  const [userList, setUserList] = useState("");

  const handleSave = async () => {
    if (!title || !deskripsi || !assignedTo || !deadline) {
      alert("❌ Semua field wajib diisi!");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // ambil token JWT untuk autentikasi
      const response = await fetch("http://localhost:5001/api/task-management/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          judul: title,
          deskripsi,
          assigned_to: assignedTo, // ini ID user karyawan
          status: "pending", // default status
          deadline,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        FailedAlert(data.message);
      } else {
        SuccessAlert(data.message);
        onClose(); // tutup modal
        refreshTasks(); // reload task list supaya task baru muncul
      }
    } catch (err) {
      console.error("Error saat tambah task:", err);
      alert("Terjadi error saat menambahkan task");
    }
  };

  const fetchUsers = async () => {
    try{
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/users/karyawan', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json();
      setUserList(data);
    } catch(err)
    {
      console.log(`Gagal Fetch User`);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [isOpen])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center
    backdrop-blur-sm backdrop-brightness-90 transition-all duration-250 ease-in-out">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-4">Tambah Task</h2>

        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded w-full p-2 mb-4"
          placeholder="Judul Task"
        />

        <label className="block mb-2">Description</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="border rounded w-full p-2 mb-4"
          placeholder="Deskripsi Task"
        />

        <label className="block mb-2">Assigned To</label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        >
          <option value="">-- Select User --</option>
          {userList.data?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

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
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
