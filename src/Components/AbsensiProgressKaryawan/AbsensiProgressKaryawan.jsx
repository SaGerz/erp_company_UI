import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const AbsensiProgressKaryawan = () => {
  const {userRole} = useAuth();
  const token = localStorage.getItem("token");
  const [absensi, setAbsensi] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data absensi user
  useEffect(() => {
    if (!token) return;
    const fetchAbsensi = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/absensi/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        setAbsensi(result.data);
      } catch (error) {
        console.error("Gagal ambil data absensi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbsensi();
  }, [userRole]);

  if (loading) return <p>Loading absensi...</p>;

  // Filter data bulan ini
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const absensiBulanIni = absensi.filter((item) => {
    const tgl = new Date(item.tanggal);
    return tgl.getMonth() === currentMonth && tgl.getFullYear() === currentYear;
  });

  // Hitung berdasarkan keterangan
  const totalHariKerja = absensiBulanIni.length;
  const hadir = absensiBulanIni.filter((item) => item.keterangan === "Hadir").length;
  const izin = absensiBulanIni.filter((item) => item.keterangan === "Izin").length;
  const sakit = absensiBulanIni.filter((item) => item.keterangan === "Sakit").length;
  const alfa = absensiBulanIni.filter((item) => item.keterangan === "Tidak Hadir").length;

  const persenHadir =
    totalHariKerja === 0 ? 0 : Math.round((hadir / totalHariKerja) * 100);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">🕒 Absensi Bulan Ini</h2>

      <div className="mb-2">
        <p>Hadir: {hadir} hari</p>
        <p>Izin: {izin} hari</p>
        <p>Sakit: {sakit} hari</p>
        <p>Tidak Hadir: {alfa} hari</p>
      </div>

      <div className="w-full bg-gray-200 h-4 rounded">
        <div
          className="bg-green-600 h-4 rounded"
          style={{ width: `${persenHadir}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{persenHadir}% hadir dari {totalHariKerja} hari</p>
    </div>
  );
};

export default AbsensiProgressKaryawan;
