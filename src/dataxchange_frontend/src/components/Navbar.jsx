// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css'; // ✅ Import custom CSS

export default function Navbar() {
  const location = useLocation();

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
      </div>
    </nav>
  );
}
