import React from 'react';
import '../styles/about.css';

export default function AboutPage() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About DataXchange</h1>
        <p>Empowering AI innovation with secure, decentralized access to high-quality datasets.</p>
      </section>

      <section className="about-section">
        <h2>🚀 Our Mission</h2>
        <p>
          DataXchange is building a trustless marketplace where data providers can monetize datasets fairly and buyers
          can access verifiable, high-value data without middlemen.
        </p>
      </section>

      <section className="about-section">
        <h2>🧠 Why Decentralized?</h2>
        <p>
          By using ICP, we eliminate intermediaries and reduce costs, ensuring transparency and fairness.
        </p>
      </section>

      <section className="about-section">
        <h2>🔐 Security & Privacy"</h2>
        <p>
          Powered by Internet Identity, your credentials and data transactions remain private and secure.
        </p>
      </section>
    </div>

    
  );
}
