// src/pages/AdminApprovalPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBackendActor } from "../services/backend";
import { UserContext } from "../context/UserContext";
import "../styles/admin.css";

export default function AdminApprovalPage() {
  const { id } = useParams(); // dataset ID from URL
  const { iiPrincipal, loading } = useContext(UserContext);
  const [pending, setPending] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
    const navigate = useNavigate();

const handleBack = () => {
  navigate(-1); 
};

  const fetchRequests = async () => {
    try {
      const backend = getBackendActor();
      const reqs = await backend.get_pending_requests(BigInt(id));
      setPending(reqs);
    } catch (err) {
      console.error("Error fetching pending requests:", err);
      setError("Failed to load requests.");
    }
  };

  const handleApprove = async (buyer) => {
    try {
      const backend = getBackendActor();
      const msg = await backend.approve_buyer(BigInt(id), buyer);
      setMessage(`✅ ${buyer.toText()} approved`);
      // Refresh list
      fetchRequests();
    } catch (err) {
      console.error("Approval failed:", err);
      setError("Failed to approve buyer.");
    }
  };

  useEffect(() => {
    if (!loading && iiPrincipal) fetchRequests();
  }, [iiPrincipal, loading]);

  if (loading) return null;
  if (!iiPrincipal) return <p>Please log in to view approval panel.</p>;

  return (
    <div className="admin-approval">
        <button className="back-button" onClick={handleBack}>← Back</button>
      <h1>🔐 Approve Buyers for Dataset #{id}</h1>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      {!pending.length && <p>No pending requests for this dataset.</p>}

      <ul className="pending-list">
        {pending.map((buyer, i) => (
          <li key={i} className="pending-item">
            <code>{buyer.toText()}</code>
            <button onClick={() => handleApprove(buyer)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
