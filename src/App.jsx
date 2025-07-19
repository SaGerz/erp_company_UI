import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Nabar";
import Footer from "./Components/Footer/Footer";
import Dashboard from "./Pages/Dashboard";
import TaskManagement from "./Pages/TaskManagement";
import WorkingHistory from "./Pages/WorkingHistory";
import Absensi from "./Pages/Absensi";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import WorkingHistoryDetail from "./Pages/WorkingHistoryDetail";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Pages (tanpa sidebar/navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Layout Pages */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>

            <div className="flex">
              <Sidebar />
              <div className="flex flex-col flex-1 min-h-screen">
                <Navbar />
                <main className="ml-64 mt-16 p-6 bg-gray-50 flex-1">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/absensi" element={<Absensi />} />
                    <Route
                      path="/task-management"
                      element={<TaskManagement />}
                    />
                    <Route
                      path="/working-history"
                      element={<WorkingHistory />}
                    />
                    <Route path="/working-history/:id" element={<WorkingHistoryDetail />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
