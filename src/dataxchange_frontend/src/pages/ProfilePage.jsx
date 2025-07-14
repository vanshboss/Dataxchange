// src/pages/ProfilePage.jsx
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { iiPrincipal } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <h3>👤 My Profile </h3>

      <div className="profile-info">
        <p><strong>Internet Identity:</strong></p>
        <code>{iiPrincipal}</code>
      </div>

      <div className="profile-actions">
        <button className="profile-card" onClick={() => navigate("/myuploads")}>
          📦 My Uploads
        </button>
        <button className="profile-card" onClick={() => navigate("/myrequests")}>
          📥 Pending Requests
        </button>
        <button className="profile-card" onClick={() => navigate("/explore")}>
          🔍 Explore Datasets
        </button>
      </div>
    </div>
  );
}
