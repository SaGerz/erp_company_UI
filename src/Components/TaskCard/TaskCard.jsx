import { useState } from "react";
import { formatDate } from "../../Utils/dateFormatter";

export default function TaskCard({ task }) {
  const [status, setStatus] = useState(task.status);
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/task-access/update-status/${task.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }), // langsung kirim status dari state
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ ${data.message}`);
      } else {
        alert("✅ Status berhasil diperbarui");
        setIsEditing(false);
        // Optional: refresh task list kalau lu punya fungsi refresh
      }
    } catch (err) {
      console.error("❌ Error update status:", err);
      alert("Terjadi error saat update status");
    }
  };



  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "On Progress" },
    { value: "done", label: "Selesai" }
  ];

  return (
    <div className="bg-white rounded shadow p-4 space-y-2 border">
      <h2 className="text-xl font-semibold">{task.judul}</h2>
      <p className="text-gray-700 text-sm" >{task.deskripsi}</p>
      <p className="text-gray-600">👤 Assigned By: {task.assigned_by}</p>
      <p className="text-gray-500">📅 Deadline: {formatDate(task.deadline)}</p>

      <div className="flex items-center space-x-2">
        <label htmlFor={`status-${task.id}`} className="font-medium">
          Status:
        </label>
        <select
          id={`status-${task.id}`}
          value={status} // default value dari DB
          onChange={handleStatusChange}
          className="border rounded px-2 py-1"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {isEditing && (
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
