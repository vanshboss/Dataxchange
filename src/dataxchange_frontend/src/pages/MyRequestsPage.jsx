// src/pages/MyRequestsPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { getBackendActor } from "../services/backend";
import { UserContext } from "../context/UserContext";
import { Principal } from "@dfinity/principal";
import "../styles/requests.css";

export default function MyRequestsPage() {
  const { iiPrincipal, loading } = useContext(UserContext);
  const [datasets, setDatasets] = useState([]);
  const [requestsMap, setRequestsMap] = useState({});
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    if (!iiPrincipal || loading) return;

    const loadRequests = async () => {
      const backend = getBackendActor();

      const all = await backend.get_all_datasets();
      const mine = all.filter(([id, title, price, wallet, owner]) =>
        owner.toString() === iiPrincipal
      );

      const reqMap = {};
      for (const [id] of mine) {
        const reqs = await backend.get_pending_requests(id);
        reqMap[id] = reqs;
      }

      setDatasets(mine);
      setRequestsMap(reqMap);
    };

    loadRequests();
  }, [iiPrincipal, loading]);

  const approveBuyer = async (datasetId, buyer) => {
    const backend = getBackendActor();
    try {
      const res = await backend.approve_buyer(datasetId, Principal.fromText(buyer));
      setStatusMsg(`✅ ${res}`);
      // Remove from state immediately
      setRequestsMap((prev) => ({
        ...prev,
        [datasetId]: prev[datasetId].filter(p => p.toString() !== buyer)
      }));
    } catch (e) {
      console.error("Error approving buyer:", e);
      setStatusMsg("❌ Approval failed.");
    }
  };

  if (!iiPrincipal) return <p>Please login to view requests.</p>;

  return (
    <div className="requests-container">
      <h1>📝 Pending Access Requests</h1>
      {statusMsg && <p className="status-msg">{statusMsg}</p>}

      {datasets.map(([id, title]) => (
        <div key={id} className="dataset-block">
          <h3>{title}</h3>
          {requestsMap[id]?.length ? (
            <ul>
              {requestsMap[id].map((p, idx) => (
                <li key={idx}>
                  <code>{p.toString()}</code>
                  <button onClick={() => approveBuyer(id, p.toString())}>
                    ✅ Approve
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending requests.</p>
          )}
        </div>
      ))}
    </div>
  );
}
