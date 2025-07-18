import React from "react";
import { useNavigate } from "react-router-dom";
import AbsensiImg from "../assets/absent.png";
import TaskManagementImg from "../assets/task-management.png";
import WorkingHistoryImg from "../assets/working-history.png";

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Absensi",
      image: AbsensiImg, // undraw image link
      route: "/absensi",
    },
    {
      id: 2,
      title: "Task Management",
      image: TaskManagementImg,
      route: "/task-management",
    },
    {
      id: 3,
      title: "Working History",
      image: WorkingHistoryImg,
      route: "/working-history",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🏠 Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <button
                onClick={() => navigate(card.route)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full cursor-pointer"
              >
                Go to {card.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
