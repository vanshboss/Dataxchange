import React, { useEffect, useState, useContext } from "react";
import { getBackendActor } from "../services/backend.js";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import "../styles/myuploads.css";

export default function MyUploadsPage() {
  const { iiPrincipal, loading } = useContext(UserContext);
  const [uploads, setUploads] = useState([]);
  const [error, setError] = useState(null);
    



  useEffect(() => {
    if (!iiPrincipal || loading) return;

    const fetch = async () => {
      try {
        const backend = getBackendActor();
        const all = await backend.get_all_datasets();

        // Debug: show what's returned
        // console.log("📦 All datasets:", all);
        // console.log("👤 Current Principal:", iiPrincipal);

        // Convert iiPrincipal to string if it's not already
        const currentPrincipalStr = iiPrincipal.toString();

        const mine = all.filter(ds => {
          const ownerPrincipal = ds[4]; // Principal object
          const ownerStr = ownerPrincipal.toText?.() || ownerPrincipal.toString?.() || String(ownerPrincipal);
          return ownerStr === currentPrincipalStr;
        });

        // console.log("✅ Filtered My Uploads:", mine);

        const formatted = mine.map(ds => ({
          id: Number(ds[0]),
          title: ds[1],
          price: Number(ds[2]),
          wallet: ds[3],
          owner: ds[4].toText?.() || ds[4]?.toString?.(),
        }));

        setUploads(formatted);
      } catch (err) {
        // console.error("Error loading uploads:", err);
        setError("Failed to fetch your datasets.");
      }
    };

    fetch();
  }, [iiPrincipal, loading]);

  if (loading) return <p className="loading">⏳ Loading...</p>;
  if (!iiPrincipal) return <p>Please login to view your uploads.</p>;

  return (
    <div className="myuploads-container">
    
      <h1>📦 My Uploaded Datasets</h1>
      {error && <p className="error">{error}</p>}
      {!uploads.length && !error && <p>No datasets uploaded yet.</p>}

      <ul className="upload-list">
        {uploads.map((ds) => (
          <li key={ds.id} className="upload-item">
            <div>
              <strong>{ds.title}</strong> — {ds.price} ICP
            </div>
            <Link className="manage-link" to={`/admin/requests/${ds.id}`}>
              Manage Access
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
