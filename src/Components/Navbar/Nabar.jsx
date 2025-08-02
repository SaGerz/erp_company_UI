import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Navbar.css"

const Navbar = () => {
  const navigate = useNavigate();
  const { userName, userRole, setUserRole, setUserName } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole("");
    setUserName("");
    navigate("/login");
  };

  return (
    <div className="ml-64 bg-white h-16 shadow flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-10">
      <div className="text-lg font-bold">Working Monitoring Dashboard</div>

      <div className="flex items-center space-x-4">
        <div className="text-gray-600">🔔</div>
        
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="cursor-pointer text-gray-700 px-2 py-1 bg-gray-50 rounded"
          >
            👤 {userName} - ({userRole})
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow animate-fade-in">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;