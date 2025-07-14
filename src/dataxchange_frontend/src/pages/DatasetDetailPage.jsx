import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getBackendActor } from "../services/backend";
import "../styles/detail.css";
import { shortenPrincipal } from "../utils/principal";
import { hasAccess } from "../services/api";
import { toast } from "react-toastify";

export default function DatasetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { iiPrincipal, loading } = useContext(UserContext);
const [hasDownloadAccess, setHasDownloadAccess] = useState(false);
  const [dataset, setDataset] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingDataset, setLoadingDataset] = useState(true);
 
  useEffect(() => {
    const checkAccess = async () => {
      if (iiPrincipal && dataset) {
        const access = await hasAccess(dataset.id);
        setHasDownloadAccess(access);
      }
    };
    checkAccess();
  }, [iiPrincipal, dataset]);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const actor = await getBackendActor();
        const all = await actor.get_all_datasets();
        const match = all.find((d) => Number(d[0]) === Number(id));

        if (match) {
          setDataset({
            id: Number(match[0]),
            title: match[1],
            category: match[2],
            price: Number(match[3]),
            wallet: match[4],
            owner: match[5].toText(),
          });
        }

        setLoadingDataset(false);
      } catch (err) {
        console.error("Failed to fetch dataset:", err);
        setMessage("❌ Could not load dataset.");
        setLoadingDataset(false);
      }
    })();
  }, [id]);

  const handleBack = () => navigate(-1);

  const handleRequest = async () => {
    try {
      const actor = await getBackendActor();
      const res = await actor.request_access(BigInt(id));
      setMessage(res);
      if (res.includes("submitted")) {
      toast.info("✅ Request submitted. Awaiting approval.");
    } else {
      toast.warning(res); // fallback if any warning
    }
    } catch (err) {
      setMessage("❌ Failed to request access.");
      toast.error("❌ Failed to request access.");
      console.error(err);
    }
  };

  const handleDownload = async () => {
    try {
      const actor = await getBackendActor();
      const res = await actor.view_dataset(BigInt(id));

      if ("Ok" in res) {
        const blob = new Blob([new Uint8Array(res.Ok)], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${dataset.title}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        alert(res.Err);
      }
    } catch (err) {
      alert("Download failed.");
      console.error(err);
    }
  };

  if (loading || loadingDataset) return <p>⏳ Loading dataset...</p>;
  if (!dataset) return <p>❌ Dataset not found.</p>;

  const isOwner = iiPrincipal === dataset.owner;

  return (
    <div className="detail-container">
      <button className="back-button" onClick={handleBack}>← Back</button>
      <h2>{dataset.title}</h2>
      <p><strong>Category:</strong> {dataset.category}</p>
      <p><strong>Price:</strong> {dataset.price} ICP</p>
    <p><strong>Owner:</strong> {shortenPrincipal(dataset.owner)}</p>
 
      <div className="detail-actions">
        {!loading && iiPrincipal && !isOwner && (
          <button onClick={handleRequest} className="btn-primary">
            Request Access
          </button>
        )}
        {isOwner && <p className="owner-label">You are the owner.</p>}
      {hasDownloadAccess && !isOwner && (
        <button onClick={handleDownload} className="btn-secondary">
          Download
        </button>
      )}
        {message && <p className="detail-message">{message}</p>}
      </div>
    </div>
  );
}
