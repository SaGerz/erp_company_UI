import React from "react";
import TaskProgressSummary from "../Components/TaskProgressSummary/TaskProgressSummary";
import AbsensiProgressKaryawan from "../Components/AbsensiProgressKaryawan/AbsensiProgressKaryawan";
import { useAuth } from "../Context/AuthContext";
import AbsensiSummaryAtasan from "../Components/AbsensiSummaryAtasan/AbsensiSummaryAtasan";

function Dashboard() {
  const {userRole} = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🏠 Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <TaskProgressSummary />
        {
          userRole === "atasan" ? 
          <AbsensiSummaryAtasan /> : <AbsensiProgressKaryawan />
        }
      </div>
    </div>
  );
}

export default Dashboard;
