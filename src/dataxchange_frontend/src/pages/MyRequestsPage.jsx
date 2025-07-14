// src/pages/MyRequestsPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { getMyRequests, viewDataset } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/requests.css";
import { toast } from "react-toastify";

export default function MyRequestsPage() {
  const { iiPrincipal, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [statusMsg, setStatusMsg] = useState(null);
const handleBack = () => {
  navigate(-1); 
};
  useEffect(() => {
    const fetchRequests = async () => {
      if (!iiPrincipal) return;
      try {
        const reqs = await getMyRequests();
        const approvedNow = reqs.filter(r => r.status?.Approved !== undefined);
        if (approvedNow.length > 0) {
          toast.success("🎉 You have approved datasets ready to download!");
        }
        setRequests(reqs);
      } catch (err) {
        console.error("Failed to load requests:", err);
        toast.error("❌ Failed to fetch your access requests");
        setStatusMsg("Failed to load your requests.");

      }
    };
    fetchRequests();
  }, [iiPrincipal, loading]);

  const handleDownload = async (id, title) => {
    try {
      const bytes = await viewDataset(id);
      const blob = new Blob([bytes], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.bin`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      setStatusMsg("Download failed. You may not have access to this file.");
    }
  };

  if (loading) return <p className="loading-message">⏳ Loading...</p>;
  if (!iiPrincipal) return <p>Please log in to view your requests.</p>;

  return (
    <div className="requests-container">
      <button className="back-button" onClick={handleBack}>← Back</button>
      <h3>📬 My Requests</h3>
      {statusMsg && <p className="status-msg error">{statusMsg}</p>}
      
      {!requests.length ? (
        <p className="no-requests">You have no pending or approved requests.</p>
      ) : (
        <ul className="requests-list">
          {requests.map((req) => (
            <li key={req.dataset_id} className={`request-item status-${req.status.toLowerCase()}`}>
              <div className="request-details">
                <strong>{req.title}</strong>
                <span className="request-status">{req.status}</span>
              </div>
              {req.status === "Approved" && (
                <button 
                  onClick={() => handleDownload(req.dataset_id, req.title)} 
                  className="download-btn"
                >
                  Download
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}