// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/navbar.css'; 

export default function Navbar() {
  const location = useLocation();
  const { identity, login, logout } = useContext(AuthContext);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">DataXchange</div>
        <ul className="nav-links">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Explore', path: '/explore' },
            { name: 'Categories', path: '/categories' },
            { name: 'Providers', path: '/providers' },
            { name: 'Upload', path: '/upload' },
            { name: 'Buyer', path: '/buyers' },
            // { name: 'Seller', path: '/sellers' },
            // { name: 'Contact', path: '/contact' },
          ].map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`nav-link ${isActive(path) ? 'active' : ''}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
         <div className="auth-button">
          {identity ? (
            <button onClick={logout} className="btn">
              Logout
            </button>
          ) : (
            <button onClick={login} className="btn">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
