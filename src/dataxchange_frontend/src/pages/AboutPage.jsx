// src/pages/AboutPage.jsx
import React, { useEffect } from "react";
import "../styles/about.css";

export default function AboutPage() {
   useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => revealElements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="about-container">
      <section className="about-hero reveal">
        <h1>About DataXchange</h1>
        <p>
          Empowering decentralized data sharing for AI, researchers, and enterprises.
        </p>
      </section>

      <section className="about-section reveal">
        <h2>🌍 Our Mission</h2>
        <p>
          Our mission is to democratize access to high-quality datasets using blockchain technology,
          giving full control to data providers and buyers.
        </p>
      </section>

      <section className="about-section reveal">
        <h2>⚙️ How It Works</h2>
        <div className="timeline">
          <div className="timeline-item">🆕 Upload Dataset</div>
          <div className="timeline-item">🔐 Stored securely in canisters</div>
          <div className="timeline-item">📊 Listed for buyers to explore</div>
          <div className="timeline-item">💰 Buyer requests and pays off-chain</div>
          <div className="timeline-item">✅ Seller approves and unlocks access</div>
        </div>
      </section>

      <section className="about-section reveal">
        <h2>👨‍💻 Meet the Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img src="/logo192.png" alt="Sampath" />
            <h4>Sampath Edke</h4>
            <p>Blockchain Developer & Frontend Engineer</p>
          </div>
          <div className="team-card">
            <img src="/logo192.png" alt="Teammate" />
            <h4>Vansh Manhas</h4>
            <p>Block Developer & ICP Rust Backend Developer</p>
          </div>
        </div>
      </section>

      <section className="about-section reveal">
        <h2>📬 Want to Connect?</h2>
        <p>
          We're open to collaboration, feedback, and ideas. Reach out through GitHub or our documentation.
        </p>
        <div className="button-row">
          <a href="https://github.com/sampathedke/dataxchange" target="_blank" rel="noreferrer" className="external-button">🔗 GitHub</a>
          
        </div>
      </section>
    </div>
  );
}
