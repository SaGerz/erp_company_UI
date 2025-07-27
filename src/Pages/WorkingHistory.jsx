import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import ModalAdd_WorkingHistory from "../Components/ModalAdd_WorkingHistory/ModalAdd_WorkingHistory";
import ModalEdit_WorkingHistory from "../Components/ModalEdit_WorkingHistory/ModalEdit_WorkingHistory";
import { formatDate } from "../Utils/dateFormatter";
import { useAuth } from "../Context/AuthContext";

function WorkingHistory() {
  const {userRole, authLoading} = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchWorkingHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5001/api/working-history/get-task?toDate=${selectedDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setData(json.data || []);
    } catch (err) {
      console.error("❌ Error ambil working history:", err);
    }
  };

  const fetchUsersList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5001/api/users/karyawan-roles`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      const result = await response.json();
      setUsers(result.data || []);
    } catch (error) {
      console.error("❌ Error ambil data users :", err);
    }
  }

  const handleUpdate = (updatedItem) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  useEffect(() => {
  if (authLoading) return;

  const fetchData = async () => {
    if (userRole === "karyawan") {
      await fetchWorkingHistory(); // fetch data diri sendiri
    } else if (userRole === "atasan") {
      await fetchUsersList(); // fetch semua users untuk ditampilkan
    }
  };

  fetchData();
}, [userRole, selectedDate, authLoading]);

  // useEffect(() => {
  //   fetchWorkingHistory();
  // }, [selectedDate])

  // useEffect(() => {
  //   fetchUsersList();
  // }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📒 Working History</h1>

      {/* Conditional role */}
      {userRole === "karyawan" ? (
        <>
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

          {/* Table Karyawan */}
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
                      <td className="px-6 py-4">{item.jam_mulai}</td>
                      <td className="px-6 py-4">{item.jam_selesai}</td>
                      <td className="px-6 py-4">{formatDate(item.tanggal)}</td>
                      <td className="px-6 py-4">{item.STATUS}</td>
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
            <ModalAdd_WorkingHistory
              onClose={() => setIsModalAddOpen(false)}
              onSucess={fetchWorkingHistory}
            />
          )}

          {/* Modal Edit */}
          {isModalEditOpen && selectedActivity && (
            <ModalEdit_WorkingHistory
              isOpen={isModalEditOpen}
              onClose={() => setIsModalEditOpen(false)}
              data={selectedActivity}
              onSave={handleUpdate}
              onSucess={fetchWorkingHistory}
            />
          )}
        </>
      ) : (
        <>
          {/* Table Atasan */}
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/working-history/${user.id}`)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        🔍 View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default WorkingHistory;
