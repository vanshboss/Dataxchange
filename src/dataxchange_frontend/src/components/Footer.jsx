// src/components/Footer.jsx
import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";

import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">DataXchange</div>
        <p className="footer-tagline">Decentralized Data Marketplace on ICP</p>
        
        <ul className="footer-links">
          <li><a href="/about">About</a></li>
          <li><Link to="/contact">Contact</Link></li>

          <li><a href="#">Privacy</a></li>
        </ul>
         <div className="footer-social">
          <a href="https://github.com/sampathedke/dataxchange" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} DataXchange. All rights reserved.</p>
      </div>
    </footer>
  );
}

