// src/pages/MyUploadsPage.jsx
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
    if (loading || !iiPrincipal) return;

    (async () => {
      try {
        const actor = await getBackendActor(true);
        const all = await actor.get_all_datasets();
console.group("🔍 MyUploads DEBUG");
      console.log("• iiPrincipal (current user):", iiPrincipal);
        // Filter by owner principal string
        all.forEach(([id, title, category, price, wallet, owner], i) => {
        console.log(`  [${i}] ds.id=${id} owner=${owner.toText()}`);
      });
      console.groupEnd();

      const mine = all.filter(
        ([, , , , , owner]) => owner.toText?.() === iiPrincipal
      );

        setUploads(
          mine.map(([id, title, category, price, wallet, owner]) => ({
          id: Number(id),
          title,
          category,
          price: Number(price),
          wallet,
          owner: owner.toText?.() || owner.toString?.() || String(owner),
          }))
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load your uploads.");
      }
    })();
  }, [iiPrincipal, loading]);

  if (loading) return <p className="loading">⏳ Loading…</p>;
  if (!iiPrincipal) return <p>Please log in to view your uploads.</p>;

  return (
    <div className="myuploads-container">
      <h3>📦 My Uploaded Datasets</h3>
      {error && <p className="error">{error}</p>}
      {!uploads.length && !error && <p>No uploads yet.</p>}

      <ul className="upload-list">
        {uploads.map((ds) => (
          <li key={ds.id} className="upload-item">
            <div>
              <strong>{ds.title}</strong> ({ds.category}) — {ds.price} ICP
            </div>
            <Link to={`/admin/requests/${ds.id}`} className="manage-link">
              Manage Access
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
