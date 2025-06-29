import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>DataXchange</h3>
          <p>&copy; {new Date().getFullYear()} DataXchange. All rights reserved.</p>
        </div>
        <ul className="footer-links">
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>
      </div>
    </footer>
  );
}
