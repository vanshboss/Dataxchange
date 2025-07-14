import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { getBackendActor } from "../services/backend";
import { getDatasetById, getPendingRequests, approveBuyer } from "../services/api"; // Import functions
import { UserContext } from "../context/UserContext";
import "../styles/requests.css";

export default function MyRequestsPage() {
  const { id } = useParams(); // Get the dataset ID from the URL
  const { iiPrincipal, loading } = useContext(UserContext);
  const [dataset, setDataset] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    if (!id || loading) return;

    const loadRequests = async () => {
      try {
        const ds = await getDatasetById(Number(id));
        if (!ds) {
          setStatusMsg("❌ Dataset not found.");
          return;
        }

        // Check if the current user is the owner of this dataset
        if (ds.owner !== iiPrincipal) {
          setStatusMsg("🔒 Access Denied: You do not own this dataset.");
          return;
        }

        setDataset(ds);
        const reqs = await getPendingRequests(Number(id));
        setPendingRequests(reqs);

      } catch (err) {
        console.error("Error loading requests:", err);
        setStatusMsg("❌ Failed to load requests.");
      }
    };

    loadRequests();
  }, [id, iiPrincipal, loading]);

  const handleApprove = async (buyer) => {
    try {
      const res = await approveBuyer(dataset.id, buyer);
      setStatusMsg(`✅ ${res}`);

      // Optimistically update UI
      setPendingRequests((prev) => prev.filter((p) => p !== buyer));
    } catch (e) {
      console.error("Approval error:", e);
      setStatusMsg("❌ Approval failed.");
    }
  };
  
  // Helper to shorten the principal for display
  const shortenPrincipal = (principal) => {
    return `${principal.slice(0, 4)}...${principal.slice(-4)}`;
  };

  if (loading || !dataset) return <p className="loading">⏳ Loading...</p>;
  if (!iiPrincipal) return <p>🔒 Please log in to view access requests.</p>;

  return (
    <div className="requests-container">
      <h2>📥 Pending Requests for: {dataset.title}</h2>
      {statusMsg && <p className="status-msg">{statusMsg}</p>}
      
      {pendingRequests.length ? (
        <ul>
          {pendingRequests.map((p, idx) => (
            <li key={idx}>
              <code>{shortenPrincipal(p)}</code>
              <button onClick={() => handleApprove(p)}>
                ✅ Approve
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-requests">No pending requests.</p>
      )}
    </div>
  );
}