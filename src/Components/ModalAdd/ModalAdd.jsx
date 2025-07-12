import { useState } from "react";

export default function ModalAdd({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSave = () => {
    console.log("✅ New Task Data:", {
      title,
      deskripsi,
      assignedTo,
      deadline,
    });
    onClose();
  };

  if (!isOpen) return null;

   const dummyUsers = [
    { id: 1, name: "Samuel Genaro" },
    { id: 2, name: "tikus" },
    { id: 3, name: "John Smith" },
    { id: 4, name: "Alice Johnson" },
  ];

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
          {dummyUsers.map((user) => (
            <option key={user.id} value={user.name}>
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
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
