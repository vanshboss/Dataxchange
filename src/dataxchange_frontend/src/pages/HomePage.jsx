import React from 'react';
import '../styles/home.css';

export default function HomePage() {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="home-title">🚀 Welcome to DataXchange</h1>
        <p className="home-subtitle">Secure. Decentralized. AI-Ready Data Marketplace.</p>
        <a href="/explore" className="cta-button">Explore</a>
      </section>

      {/* About Marketplace */}
      <section className="section gray-bg">
        <h2 className="section-title">Why DataXchange?</h2>
        <p className="section-description">
          DataXchange connects AI developers, researchers, and enterprises with reliable data providers in a secure and decentralized manner.
        </p>
        <div className="value-props">
          <div className="card">🔐 100% on-chain data access via Internet Computer</div>
          <div className="card">⚡ Fast ICP-based payments with no intermediaries</div>
          <div className="card">📦 IPFS storage support with tamper-proof listings</div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="section">
        <h2 className="section-title">Popular Categories</h2>
        <div className="category-preview">
          <div className="card">🧠 NLP — Sentiment, Question Answering, Translation</div>
          <div className="card">📸 Computer Vision — Image classification, Object detection</div>
          <div className="card">📈 Finance — Stock, crypto, economic indicators</div>
          <div className="card">🛰️ Satellite — Earth observation, Climate data</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section gray-bg">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step"><h3>1. Upload</h3><p>Dataset providers upload data with metadata and price.</p></div>
          <div className="step"><h3>2. Mint Canister</h3><p>Store metadata & hash on-chain using Rust smart contract.</p></div>
          <div className="step"><h3>3. Discover</h3><p>Users browse or search datasets by filters or tags.</p></div>
          <div className="step"><h3>4. Purchase</h3><p>Buyers pay in ICP, sellers receive royalties automatically.</p></div>
        </div>
      </section>

      {/* Buyer & Seller Guide */}
      <section className="section">
        <h2 className="section-title">How to Buy or Sell</h2>
        <div className="steps small">
          <div className="step">
            <h3>🧑‍💻 Buyers</h3>
            <ul>
              <li>Create Internet Identity</li>
              <li>Browse data by category</li>
              <li>Pay with ICP via wallet</li>
              <li>Get secure access to datasets</li>
            </ul>
          </div>
          <div className="step">
            <h3>📤 Sellers</h3>
            <ul>
              <li>Login via Internet Identity</li>
              <li>Upload dataset + description</li>
              <li>Set price, category & license</li>
              <li>Earn revenue for every access</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta">
        <h2 className="section-title">Start Exploring or Selling Your Datasets Today</h2>
        <a href="/upload" className="cta-button">Become a Data Provider</a>
      </section>
    </div>
  );
}
