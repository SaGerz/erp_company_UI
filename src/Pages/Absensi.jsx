import React, { useEffect, useState } from "react";
import { formatDate } from "../Utils/dateFormatter";
import { useAuth } from "../Context/AuthContext";
import ModalExportMonthAbsensi from "../Components/ModalExportMonth_Absensi/ModalExportMonthAbsensi";

const Absensi = () => {
  // const [userRole, setUserRole] = useState("atasan"); // "karyawan" or "atasan"
  const {userRole, authLoading} = useAuth();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default tanggal
  const [absensiData, setAbsensiData] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleCheckIn = async () => {
    console.log("✅ Check In clicked");
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const {latitude, longitude} = position.coords;
        const token = localStorage.getItem("token");

        const response = await fetch('http://localhost:5001/api/absensi/masuk', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            lat: latitude,
            lon: longitude
          })
        }) 

        const data = await response.json();

        if(!response.ok)
        {
          alert(`Gagal absen ${data.message}`);
        } else {
          alert('Absen berhasil')
          fetchAbsensiUser();
        }
      }, (error) => {
        console.error('Error mendapatkan location', error);
        alert('Gagal Mengambil Lokasi. Pastikan Lokasi aktif!')
      })
    } catch (err)
    {
      console.error('Error Absen Masuk:', err);
      alert('Terjadi error saat absen masuk.');
    }
  };

  const handleCheckOut = async () => {
    console.log("❌ Check Out clicked");
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Lokasi user:", latitude, longitude);

        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5001/api/absensi/keluar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            lat: latitude,
            lon: longitude,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          alert(`❌ Gagal Absen Keluar: ${data.message}`);
        } else {
          alert(`✅ ${data.message}`);
          fetchAbsensiUser();
        }
      }, (error) => {
        console.error('Error mendapatkan lokasi:', error);
        alert('Gagal mengambil lokasi. Pastikan GPS aktif dan diizinkan.');
      });
    } catch (err) {
      console.error('Error Absen Keluar:', err);
      alert('Terjadi error saat absen keluar.');
    }
  };
  
  const fetchAbsensiUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/absensi/me', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      const responseData = await response.json();
      setAbsensiData(responseData.data);
    } catch (error) {
      console.log(`Error : ${error}`);
      setAbsensiData([]);
    }
  }

  const fetchAbsensiAtasan = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/absensi-access/get-absensi?date=${selectedDate}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      
      const data = await response.json();
      if(!response.ok)
      {
        alert(`Error : ${data.message}`)
      }
      setAbsensiData(data.data || []);
    } catch (error) {
      console.log(`error msg : ${error}`)
    }
  };

  const handleExportAll = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/absensi-access/export-absensi-all', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // ambil token
        },
      });

      if (!res.ok) throw new Error('Gagal export');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'absensi_all.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if(!userRole) return;

    console.log(`user role 1 : ${userRole}`)
    if(userRole === "karyawan")
    {
      fetchAbsensiUser();
    } else if (userRole === "atasan"){
      fetchAbsensiAtasan();
    }
  }, [selectedDate, userRole, authLoading])

  if(authLoading){
    return <div>Loading user info...</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📅 Absensi</h1>
      </div>
      
      {userRole === "atasan" && (
        <div className="flex items-center mb-4 justify-between">
          {/* Filter Tanggal */}
          <div className="flex items-center space-x-2">
            <label className="font-medium">Filter Tanggal:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          </div>

          <div className="flex space-x-2">
            {/* Tombol Export Bulan */}
            <button
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer"
            >
            📤 Export Bulan
            </button>

            {/* Modal Export */}
            <ModalExportMonthAbsensi
              isOpen={showExportModal}
              onClose={() => setShowExportModal(false)}
            />

            {/* Tombol Export All */}
            <button
              onClick={handleExportAll}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              📤 Export All
            </button>
          </div>
        </div>
        
        
      )}


      {/* Tombol Check In / Check Out (hanya karyawan) */}
      {userRole === "karyawan" && (
        <div className="flex justify-end mb-4 space-x-2">
          <button
            onClick={handleCheckIn}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
          >
            ✅ Check In
          </button>
          <button
            onClick={handleCheckOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
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
            {absensiData.length === 0 ? (
              <tr>
                <td
                  colSpan={userRole === "atasan" ? 5 : 4}
                  className="text-center py-4 text-gray-500"
                >
                  Tidak ada data absensi untuk tanggal ini
                </td>
              </tr>
            ) : (
              absensiData.map((item) => (
                <tr key={item.id}>
                  {userRole === "atasan" && (
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.tanggal)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.jam_masuk ? `${item.jam_masuk} WIB` : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.jam_keluar ? `${item.jam_keluar} WIB` : "-"}
                  </td>
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
