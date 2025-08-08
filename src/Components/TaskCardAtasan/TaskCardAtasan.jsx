import { useState } from "react";
import { formatDate } from "../../Utils/dateFormatter";
import './TaskCardAtasan.css'

export default function TaskCardAtasan({ task, onEdit }) {
  const [showImage, setShowImage] = useState(false);

  console.log(task.attachment);
  return (
    <div className="bg-white rounded shadow p-4 space-y-2 border">
      <h2 className="text-xl font-semibold">{task.judul}</h2>
      <p className="text-gray-700 text-sm">{task.deskripsi}</p>
      <p className="text-gray-600">👤 Assigned To: {task.assigned_name}</p>
      <p className="text-gray-500">📅 Deadline: {formatDate(task.deadline)}</p>
      <p className="text-gray-500">📌 Status: {task.status}</p>
  
      {/* Tombol See Attachment kalau ada */}
      <div className="flex space-x-2 mt-2">

        {task.attachment && (
          <button
            onClick={() => setShowImage(true)}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 cursor-pointer"
          >
            See Attachment 📎
          </button>
        )}

        {/* Tombol Edit */}
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
        >
          Edit ✏️
        </button>
      </div>

      {/* Modal Preview Gambar */}
      {showImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        >
          {/* Tombol Close */}
          <button
            onClick={() => setShowImage(false)}
            className="absolute top-5 right-5 text-white text-2xl font-bold hover:text-gray-300"
          >
            ✕
          </button>

          {/* Gambar dengan animasi scale */}
          <div className="transform scale-95 opacity-0 animate-[fadeInScale_0.3s_ease-out_forwards]">
            <img
              src={`http://localhost:5001/uploads/${task.attachment}`}
              alt="Attachment"
              className="max-w-[80%] max-h-[80%] rounded shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
