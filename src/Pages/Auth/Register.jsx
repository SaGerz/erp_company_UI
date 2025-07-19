import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register with", { name, email, password });

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    })

    const data = response.json();
    if(response.ok)
    {
      setTimeout(() => {
        alert(data.message);
      }, 300)
      navigate('/');
    } else {
      alert(`Register Failed : ${data.message}`);
    }
    } catch (error) {
      console.log(`Error : `, error);
    } 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">📝 Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Register
          </button>

          <p className="text-center text-sm mt-4">
            Sudah punya akun?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login disini
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
