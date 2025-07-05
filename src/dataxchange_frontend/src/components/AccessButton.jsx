import React, { useState } from "react";
import "../styles/access.css";

export default function AccessButton({ datasetId, onRequest }) {
  const [status, setStatus] = useState(null);
  const handleClick = async () => {
    setStatus("pending");
    const msg = await onRequest(datasetId);
    setStatus(msg);
  };
  return (
    <div className="access-button">
      {status === null && (
        <button onClick={handleClick}>Request Access</button>
      )}
      {status && <p className="access-status">{status}</p>}
    </div>
  );
}
