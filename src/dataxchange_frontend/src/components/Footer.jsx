// src/components/Footer.jsx
import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">DataXchange</div>
        <p className="footer-tagline">Decentralized Data Marketplace on ICP</p>
        
        <ul className="footer-links">
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>

        <p className="footer-copy">© {new Date().getFullYear()} DataXchange. All rights reserved.</p>
      </div>
    </footer>
  );
}

