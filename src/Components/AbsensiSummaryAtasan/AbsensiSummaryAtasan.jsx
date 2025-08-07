import React, { useEffect, useState } from "react";

const AbsensiSummaryAtasan = () => {
  const [absensiData, setAbsensiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  const fetchAbsensi = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/absensi-access/get-absensi?date=${today}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setAbsensiData(result.data);
    } catch (error) {
      console.error("Gagal ambil data absensi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbsensi();
  }, []);

  if (loading) return <p>Loading absensi summary...</p>;

  const total = absensiData.length;
  const hadir = absensiData.filter((item) => item.keterangan === "Hadir").length;
  const tidakHadir = absensiData.filter((item) => item.keterangan === "Tidak Hadir").length;
  const belumAbsenMasuk = absensiData.filter((item) => item.jam_masuk === null && item.keterangan === "Hadir").length;

  return (
    <div className="bg-white p-6 rounded-lg shadow min-h-[160px]">
      <h2 className="text-xl font-semibold mb-4">📅 Absensi Hari Ini</h2>
      <p>Total Karyawan: {total}</p>
      <p className="text-green-600">✅ Hadir: {hadir}</p>
      <p className="text-red-600">❌ Tidak Hadir: {tidakHadir}</p>
      <p className="text-yellow-600">🕒 Belum Absen Masuk: {belumAbsenMasuk}</p>
    </div>
  );
};

export default AbsensiSummaryAtasan;
