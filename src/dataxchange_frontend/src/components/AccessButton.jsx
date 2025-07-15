// src/components/AccessButton.jsx
import React, { useState } from "react";
import "../styles/access.css";

/**
 * Props:
 * - datasetId: number (ID of the dataset to request access)
 * - onRequest: async function that returns a string (status message)
 */
export default function AccessButton({ datasetId, onRequest }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const msg = await onRequest(datasetId);
    setStatus(msg);
    setLoading(false);
  };

  return (
    <div className="access-button">
      {status === null && !loading && (
        <button onClick={handleClick} className="access-btn">
          Request Access
        </button>
      )}
      {loading && <p className="access-status">⏳ Requesting…</p>}
      {status && !loading && <p className="access-status">{status}</p>}
    </div>
  );
}
