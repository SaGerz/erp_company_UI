import { useState } from "react";

export default function TaskCard({ task }) {
  const [status, setStatus] = useState(task.status);
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log(`Saving task ${task.id} with status: ${status}`);
    // TODO: Nanti connect ke API PATCH
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded shadow p-4 space-y-2 border">
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-gray-700 text-sm" >{task.deskripsi}</p>
      <p className="text-gray-600">👤 Assigned By: {task.assignedBy}</p>
      <p className="text-gray-500">📅 Deadline: {task.deadline}</p>

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
          <option value="On Progress">On Progress</option>
          <option value="Selesai">Selesai</option>
          <option value="Pending">Pending</option>
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
