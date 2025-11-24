import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <img src={logo} alt="Linked Local Logo" className="h-10 w-10" />
        <span className="text-xl font-bold text-green-600">Linked Local</span>
      </Link>
      <div className="space-x-4">
        <Link to="/feed" className="text-gray-700 hover:text-green-600">Feed</Link>
        <Link to="/create-event" className="text-gray-700 hover:text-green-600">Create Event</Link>
        {token ? (
          <button onClick={logout} className="text-red-500">Logout</button>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-green-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-green-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}