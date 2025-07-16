import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function WorkingHistoryDetail() {
  const { id } = useParams(); // ambil user id dari URL
  const navigate = useNavigate();

  // Dummy data user
  const dummyUsers = [
    { id: 1, name: "Samuel Genaro", email: "samuel@example.com" },
    { id: 2, name: "Ayu Lestari", email: "ayu@example.com" },
    { id: 3, name: "Budi Santoso", email: "budi@example.com" },
  ];

  // Dummy working history
  const dummyData = [
    {
      id: 1,
      title: "Mengerjakan Report",
      deskripsi: "Membuat laporan keuangan bulanan.",
      jamMulai: "08:00",
      jamSelesai: "10:30",
      tanggal: "2025-07-14",
      status: "Selesai",
    },
    {
      id: 2,
      title: "Meeting Divisi",
      deskripsi: "Bahas progress project ERP.",
      jamMulai: "11:00",
      jamSelesai: "12:00",
      tanggal: "2025-07-14",
      status: "Pending",
    },
  ];

  const [selectedDate, setSelectedDate] = useState("2025-07-14");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cek user berdasarkan ID
    const foundUser = dummyUsers.find((u) => u.id === parseInt(id));
    if (!foundUser) {
      // Kalau user gak ada, redirect balik
      navigate("/working-history");
    } else {
      setUser(foundUser);
    }
  }, [id, navigate]);

  return (
    <div className="p-6">
      {user && (
        <>
          <h1 className="text-2xl font-bold mb-4">
            📒 Working History - {user.name}
          </h1>
          <p className="text-gray-600 mb-4">✉️ {user.email}</p>

          {/* Filter Date */}
          <div className="flex justify-between mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              ⬅️ Kembali
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dummyData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4 text-gray-500"
                    >
                      Belum ada working history untuk tanggal ini!
                    </td>
                  </tr>
                ) : (
                  dummyData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">{item.deskripsi}</td>
                      <td className="px-6 py-4">{item.jamMulai}</td>
                      <td className="px-6 py-4">{item.jamSelesai}</td>
                      <td className="px-6 py-4">{item.tanggal}</td>
                      <td className="px-6 py-4">{item.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default WorkingHistoryDetail;
