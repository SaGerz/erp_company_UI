import { useState } from "react";
import { formatDate } from "../../Utils/dateFormatter";
import FailedAlert from "../Alert/AlertFailed";
import SuccessAlert from "../Alert/AlertSuccess";

export default function TaskCard({ task, onStatusUpdated }) {
  const [status, setStatus] = useState(task.status);
  const [isEditing, setIsEditing] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setIsEditing(true);
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("status", status);
      if (attachment) {
        formData.append("attachment", attachment);
      }

      const response = await fetch(
        `http://localhost:5001/api/task-access/update-status/${task.id}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // alert(`❌ ${data.message}`);
        FailedAlert(data.message);
      } else {
        SuccessAlert(data.message);
        setIsEditing(false);
        setAttachment(null);
        if (onStatusUpdated) onStatusUpdated(); // refresh task list kalau ada fungsi ini
      }
    } catch (err) {
      console.error("❌ Error update status:", err);
      alert("Terjadi error saat update status");
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "On Progress" },
    { value: "done", label: "Selesai" },
  ];

  return (
    <div className="bg-white rounded shadow p-4 space-y-2 border">
      <h2 className="text-xl font-semibold">{task.judul}</h2>
      <p className="text-gray-700 text-sm">{task.deskripsi}</p>
      <p className="text-gray-600">👤 Assigned By: {task.assigned_by}</p>
      <p className="text-gray-500">📅 Deadline: {formatDate(task.deadline)}</p>

      <div className="flex items-center space-x-2">
        <label htmlFor={`status-${task.id}`} className="font-medium">
          Status:
        </label>
        <select
          id={`status-${task.id}`}
          value={status}
          onChange={handleStatusChange}
          className="border rounded px-2 py-1"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <label className="font-medium block mb-1">Attachment (opsional):</label>
        
        {task?.attachment ? (
          <div className="flex items-center gap-2 bg-gray-100 p-2 rounded border">
            📎 <span className="text-sm">{task.attachment}</span>
          </div>
        ) : (
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full border rounded px-2 py-1 mt-1 text-sm cursor-pointer"
          />
        )}
      </div>

      {isEditing && (
        <button
          onClick={handleSave}
          disabled={loading}
          className={`mt-2 px-3 py-1 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      )}
    </div>
  );
}
