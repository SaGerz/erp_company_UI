import { useState } from "react";

export default function TaskCardAtasan({ task, onEdit }) {
  return (
    <div className="bg-white rounded shadow p-4 space-y-2 border">
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-gray-700 text-sm" >{task.deskripsi}</p>
      <p className="text-gray-600">👤 Assigned To: {task.assignedTo}</p>
      <p className="text-gray-500">📅 Deadline: {task.deadline}</p>
      <p className="text-gray-500">📌 Status: {task.status}</p>
      <button
        onClick={() => onEdit(task)}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
      >
        Edit ✏️
      </button>
    </div>
  );
}
