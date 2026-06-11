import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import logo from "../images/PIMS_emblem.png";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await Axios.get(`http://localhost:8080/api/getUsernameAndPassword/?selection=*&schema=Accounts&table=Accounts&location=username&data=${username}`);
      const data = res.data[0];
      if (!data) {
        setError("Invalid username or password.");
      } else if (password === data.password) {
        sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
        sessionStorage.setItem("accountType", data.type);
        navigate("/patients");
      } else {
        setError("Invalid username or password.");
      }
    } catch {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-blue-700 text-white w-2/5 p-12">
        <img src={logo} alt="PIMS" className="w-20 h-20 mb-6 opacity-90" />
        <h1 className="text-4xl font-bold mb-3 tracking-tight">PIMS</h1>
        <p className="text-blue-200 text-center text-sm leading-relaxed max-w-xs">
          Patient Information Management System — secure, role-based access to patient records for healthcare professionals.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Sign in</h2>
            <p className="text-sm text-gray-500 mt-1">Enter the credentials provided by your administrator</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-xs text-gray-400 text-center">
            Need an account? Contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
