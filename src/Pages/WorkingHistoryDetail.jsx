import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../Utils/dateFormatter";
import { useAuth } from "../Context/AuthContext";

function WorkingHistoryDetail() {
  const { id } = useParams(); // ambil user ID dari URL
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
 const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );  
  const [taskData, setTaskData] = useState([]);

  // Ambil list user
  const fetchUsersList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/users/karyawan-roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      setUserList(result.data || []);
    } catch (err) {
      console.error("❌ Error ambil data users :", err);
    }
  };

  // Ambil working history berdasarkan ID user dan tanggal
  const fetchWorkingHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5001/api/working-history-access/get-task-user/${id}?toDate=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      setTaskData(result.data || []);
    } catch (err) {
      console.error("❌ Error ambil working history :", err);
    }
  };

  // Fetch user list sekali di awal
  useEffect(() => {
    fetchUsersList();
  }, []);

  // Cek dan set user
  useEffect(() => {
    if(userList.length === 0) return;
    const foundUser = userList.find((u) => u.id === parseInt(id));
    if (!foundUser) {
      navigate("/working-history");
    } else {
      setUser(foundUser);
    }
  }, [id, userList, navigate]);

  // Fetch data working history setiap kali tanggal berubah
  useEffect(() => {
    if (user) {
      fetchWorkingHistory();
    }
  }, [user, selectedDate]);

  return (
    <div className="p-6">
      {user && (
        <>
          <h1 className="text-2xl font-bold mb-4">📒 Working History - {user.name}</h1>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Deskripsi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Jam Mulai</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Jam Selesai</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {taskData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      Belum ada working history untuk tanggal ini!
                    </td>
                  </tr>
                ) : (
                  taskData.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">{item.deskripsi}</td>
                      <td className="px-6 py-4">{item.jam_mulai}</td>
                      <td className="px-6 py-4">{item.jam_selesai}</td>
                      <td className="px-6 py-4">{
                        formatDate(item.tanggal)
                      }</td>
                      <td className="px-6 py-4">{item.STATUS}</td>
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
