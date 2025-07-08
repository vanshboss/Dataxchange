// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { iiPrincipal, loginII, logout, loading } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
const [dark, setDark] = useState(false);

 const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      document.body.classList.toggle("dark-mode", next);
      return next;
    });
  };


  if (loading) return null;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleNavigate = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => navigate("/")}>
        <div className="navbar__logo-circle">
        <img src="/public/logo1.png" alt="Logo" className="navbar__img" />
        </div>
        <span>DataXchange</span>
      </div>

      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {iiPrincipal && <li><Link to="/explore">Explore</Link></li>}
        {iiPrincipal && <li><Link to="/upload">Upload</Link></li>}
      </ul>

      <div className="navbar__actions">
           <button className="theme-toggle" onClick={toggleTheme}>
      {dark ? "🌞" : "🌙"}
    </button>
        {!iiPrincipal ? (
          <button onClick={loginII} className="navbar__btn">Login</button>
        ) : (
          <div className="profile-dropdown">
            <button className="navbar__btn profile-btn" onClick={toggleDropdown}>
              👤 ▾
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleNavigate("/profile")}>👤 View Profile</button>
                <button onClick={() => handleNavigate("/myuploads")}>📦 My Uploads</button>
                <button onClick={() => handleNavigate("/myrequests")}>📥 My Requests</button>
                <hr />
                <button onClick={logout} className="logout-btn">🚪 Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
