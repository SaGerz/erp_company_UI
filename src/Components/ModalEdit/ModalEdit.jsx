import { useState } from "react";

export default function ModalEdit({ isOpen, onClose, task }) {
  const [title, setTitle] = useState(task.title);
  const [deskripsi, setDeskripsi] = useState(task.deskripsi);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const [deadline, setDeadline] = useState(task.deadline);

  const handleSave = () => {
    console.log("PATCH API", {
      id: task.id,
      title,
      deskripsi,
      assignedTo,
      deadline,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center
    backdrop-blur-sm backdrop-brightness-90 transition-all duration-300 ease-in-out">
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
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />

        <label className="block mb-2">Assigned To</label>
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />

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
