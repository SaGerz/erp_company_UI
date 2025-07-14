import React, { useState } from "react";

// Dummy data absensi karyawan
const dummyAbsensi = {
  "2025-07-14": [
    { id: 1, nama: "Budi", jamMasuk: "08:00", jamKeluar: "17:00", keterangan: "Hadir" },
    { id: 2, nama: "Siti", jamMasuk: "08:15", jamKeluar: "17:05", keterangan: "Hadir" },
    { id: 3, nama: "Andi", jamMasuk: "-", jamKeluar: "-", keterangan: "Izin" },
  ],
  "2025-07-15": [
    { id: 4, nama: "Budi", jamMasuk: "08:05", jamKeluar: "17:02", keterangan: "Hadir" },
    { id: 5, nama: "Siti", jamMasuk: "-", jamKeluar: "-", keterangan: "Sakit" },
    { id: 6, nama: "Andi", jamMasuk: "08:20", jamKeluar: "17:10", keterangan: "Hadir" },
  ],
};

const Absensi = () => {
  const [userRole, setUserRole] = useState("atasan"); // "karyawan" or "atasan"
  const [selectedDate, setSelectedDate] = useState("2025-07-14"); // Default tanggal

  const absensiKaryawan = dummyAbsensi[selectedDate] || [];

  const handleCheckIn = () => {
    console.log("✅ Check In clicked");
  };

  const handleCheckOut = () => {
    console.log("❌ Check Out clicked");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📅 Absensi</h1>
      </div>

      {/* Filter Tanggal (hanya untuk atasan) */}
      {userRole === "atasan" && (
        <div className="flex items-center mb-4 space-x-2">
          <label className="font-medium">Filter Tanggal:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
      )}

      {/* Tombol Check In / Check Out (hanya karyawan) */}
      {userRole === "karyawan" && (
        <div className="flex justify-end mb-4 space-x-2">
          <button
            onClick={handleCheckIn}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            ✅ Check In
          </button>
          <button
            onClick={handleCheckOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            ❌ Check Out
          </button>
        </div>
      )}

      {/* Table Absensi */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {userRole === "atasan" && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Nama
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Jam Masuk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Jam Keluar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Keterangan
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {absensiKaryawan.length === 0 ? (
              <tr>
                <td
                  colSpan={userRole === "atasan" ? 5 : 4}
                  className="text-center py-4 text-gray-500"
                >
                  Tidak ada data absensi untuk tanggal ini
                </td>
              </tr>
            ) : (
              absensiKaryawan.map((item) => (
                <tr key={item.id}>
                  {userRole === "atasan" && (
                    <td className="px-6 py-4 whitespace-nowrap">{item.nama}</td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">{selectedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.jamMasuk}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.jamKeluar}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.keterangan}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Absensi;
