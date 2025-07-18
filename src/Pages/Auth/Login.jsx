import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login with", { email, password });

    try{
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })

      const data = await response.json();
      console.log(data);

      if(data.token)
      {
        console.log('Masuk sini bos')
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setEmail('');
        setPassword('');
      }
    }
    catch(error)
    {
      console.log('masik error bos')
      console.log(error);
      return;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">🔐 Login</h1>
        <form onSubmit={handleLogin}>
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Belum punya akun?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Daftar disini
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
