import React, { useState } from 'react';
import ModalAdd_WorkingHistory from '../Components/ModalAdd_WorkingHistory/ModalAdd_WorkingHistory';
import ModalEdit_WorkingHistory from '../Components/ModalEdit_WorkingHistory/ModalEdit_WorkingHistory';

function WorkingHistory() {
  const [selectedDate, setSelectedDate] = useState("2025-07-14"); // default hari ini
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      title: "Membuat Laporan Absensi",
      deskripsi: "Input dan validasi data absensi seluruh karyawan.",
      jamMulai: "08:00",
      jamSelesai: "10:00",
      tanggal: "2025-07-14",
      status: "Selesai",
    },
    {
      id: 2,
      title: "Meeting Tim Developer",
      deskripsi: "Bahas progress ERP module task management.",
      jamMulai: "10:15",
      jamSelesai: "11:30",
      tanggal: "2025-07-14",
      status: "Pending",
    },
  ]);

  const handleUpdate = (updatedItem) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📒 Working History</h1>

      {/* Filter Date */}
      <div className="flex justify-between mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={() => setIsModalAddOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ➕ Tambah Aktivitas
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Deskripsi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Jam Mulai
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Jam Selesai
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Anda belum menuliskan working history hari ini!
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.deskripsi}</td>
                  <td className="px-6 py-4">{item.jamMulai}</td>
                  <td className="px-6 py-4">{item.jamSelesai}</td>
                  <td className="px-6 py-4">{item.tanggal}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedActivity(item);
                        setIsModalEditOpen(true);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      ✏️ Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add */}
      {isModalAddOpen && (
        <ModalAdd_WorkingHistory onClose={() => setIsModalAddOpen(false)} />
      )}

      {/* Modal Edit */}
      {isModalEditOpen && selectedActivity && (
        <ModalEdit_WorkingHistory
          isOpen={isModalEditOpen}
          onClose={() => setIsModalEditOpen(false)}
          data={selectedActivity}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default WorkingHistory;
