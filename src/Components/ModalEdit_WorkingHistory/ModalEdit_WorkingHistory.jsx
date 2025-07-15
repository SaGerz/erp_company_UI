import React, { useState, useEffect } from "react";

const ModalEdit_WorkingHistory = ({ isOpen, onClose, data, onSave }) => {
  const [title, setTitle] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [status, setStatus] = useState("");

  // Prefill data saat modal dibuka
  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setDeskripsi(data.deskripsi || "");
      setJamMulai(data.jamMulai || "");
      setJamSelesai(data.jamSelesai || "");
      setStatus(data.status || "");
    }
  }, [data]);

  const handleSave = () => {
    const updatedData = {
      ...data,
      title,
      deskripsi,
      jamMulai,
      jamSelesai,
      status,
    };
    console.log("Data updated:", updatedData); // sementara log
    if (onSave) onSave(updatedData); // Kirim ke parent
    onClose(); // Tutup modal
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center
      backdrop-blur-sm backdrop-brightness-90"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">✏️ Edit Working History</h2>

        <label className="block mb-2 text-sm">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded w-full p-2 mb-3"
          placeholder="Judul aktivitas"
        />

        <label className="block mb-2 text-sm">Deskripsi</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="border rounded w-full p-2 mb-3"
          placeholder="Deskripsi aktivitas"
        />

        <div className="flex space-x-2 mb-3">
          <div className="flex-1">
            <label className="block mb-2 text-sm">Jam Mulai</label>
            <input
              type="time"
              value={jamMulai}
              onChange={(e) => setJamMulai(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-sm">Jam Selesai</label>
            <input
              type="time"
              value={jamSelesai}
              onChange={(e) => setJamSelesai(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
        </div>

        <label className="block mb-2 text-sm">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        >
          <option value="">-- Pilih Status --</option>
          <option value="Pending">Pending</option>
          <option value="Selesai">Selesai</option>
          <option value="Review">Review</option>
        </select>

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
};

export default ModalEdit_WorkingHistory;
