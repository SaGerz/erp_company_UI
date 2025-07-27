import React, { useState } from "react";

const ModalAdd_WorkingHistory = ({ onClose, onSucess }) => {
  const [title, setTitle] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [tanggal, setTanggal] = useState("");

  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");
    const payload = {
      title,
      deskripsi,
      jam_mulai: jamMulai,
      jam_selesai: jamSelesai,
      tanggal,
      status: "On Process" // default saat tambah
    };

    const response = await fetch("http://localhost:5001/api/working-history/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      alert(`❌ ${result.message}`);
    } else {
      alert("✅ Data berhasil ditambahkan");
      onSucess();
      onClose();
      // Optional: trigger reload working history
    }
  } catch (error) {
    console.error("❌ Gagal kirim:", error);
    alert("Terjadi error saat menambahkan aktivitas");
  }
};


  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm backdrop-brightness-90">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-4">Tambah Aktivitas</h2>

        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />

        <label className="block mb-2">Deskripsi</label>
        <textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        ></textarea>

        <label className="block mb-2">Jam Mulai</label>
        <input
          type="time"
          value={jamMulai}
          onChange={(e) => setJamMulai(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />

        <label className="block mb-2">Jam Selesai</label>
        <input
          type="time"
          value={jamSelesai}
          onChange={(e) => setJamSelesai(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />

        <label className="block mb-2">Tanggal</label>
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
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
};

export default ModalAdd_WorkingHistory;
