import { useState } from "react";
import { Link } from "react-router-dom";
import './Sidebar.css'
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div
        className={`${
            isOpen ? "w-64" : "w-20"
        } text-white h-screen transition-all duration-300 fixed`} style={{ backgroundColor: "var(--color-sidebar)" }}
        >
        <div className="flex items-center justify-between p-4">
            <h1 className={`text-2xl font-bold ${!isOpen && "hidden"}`}>PT IATI (Dev)</h1>
            <button
            onClick={toggleSidebar}
            className="bg-blue-800 p-1 rounded hover:bg-blue-900"
            >
            {isOpen ? "<" : ">"}
            </button>
        </div>
        {/* Garis pembatas */}
        <hr className="border-gray-600 mx-1" />
        <nav className="flex flex-col space-y-2 mt-4">
            <Link
            to="/"
            className="hover:bg-blue-800 p-3 flex items-center space-x-2"
            >
            <span>🏠</span>
            {isOpen && <span>Dashboard</span>}
            </Link>
            <Link
            to="/Absensi"
            className="hover:bg-blue-800 p-3 flex items-center space-x-2"
            >
            <span>🕒</span>
            {isOpen && <span>Absensi</span>}
            </Link>
            <Link
            to="/Task-Management"
            className="hover:bg-blue-800 p-3 flex items-center space-x-2"
            >
            <span>📋</span>
            {isOpen && <span>Job Assignment</span>}
            </Link>
            <Link
            to="/Working-History"
            className="hover:bg-blue-800 p-3 flex items-center space-x-2"
            >
            <span>📜</span>
            {isOpen && <span>Working History</span>}
            </Link>
        </nav>
        </div>
    );
}

export default Sidebar;