import { useState } from "react";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './Sidebar.css'
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);
    
    const menuItems = [
        { path: "/", icon: "🏠", label: "Dashboard" },
        { path: "/Absensi", icon: "🕒", label: "Absensi" },
        { path: "/Task-Management", icon: "📋", label: "Job Assignment" },
        { path: "/Working-History", icon: "📜", label: "Working History" },
    ];

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
            {menuItems.map((item) => (
                <NavLink key={item.path} to={item.path} end
                    className={({ isActive }) =>
                    `p-3 flex items-center space-x-2 hover:bg-blue-800 transition-colors ${
                        isActive ? "bg-blue-900 font-semibold" : ""
                    }`
                }>
                    <span>{item.icon}</span>
                    {isOpen && <span>{item.label}</span>}
                </NavLink>
            ))}
        </nav>
        </div>
    );
}

export default Sidebar;