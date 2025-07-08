// src/pages/DatasetDetailPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getDatasetById, requestAccess, viewDataset } from "../services/api";
import "../styles/detail.css";

export default function DatasetDetailPage() {
  const { id } = useParams();
  const { iiPrincipal } = useContext(UserContext);

  const [dataset, setDataset] = useState(null);
  const [access, setAccess] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const handleBack = () => {
  navigate(-1); 
};


  useEffect(() => {
  const datasetId = parseInt(id);
  console.log("Fetching dataset with ID:", datasetId);

  getDatasetById(datasetId)
    .then((res) => {
      console.log("Dataset fetched:", res);
      setDataset(res);
    })
    .catch((err) => {
      console.error("Error fetching dataset:", err);
    })
    .finally(() => {
      setLoading(false);
    });
}, [id]);


  const handleRequest = async () => {
    const msg = await requestAccess(parseInt(id));
    setMessage(msg);
  };

  const handleDownload = async () => {
    const content = await viewDataset(parseInt(id));
    if (!content.startsWith("Access denied")) {
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${dataset.title}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert("You are not approved to download this dataset.");
    }
  };

  if (loading) return <p>Loading dataset...</p>;
  if (!dataset) return <p>Dataset not found.</p>;

  return (
    <div className="detail-container">
      <button className="back-button" onClick={handleBack}>← Back</button>

      <h2>{dataset.title}</h2>
      <p><strong>Price:</strong> {dataset.price} ICP</p>
      <p><strong>Owner:</strong> {dataset.owner}</p>

      <div className="detail-actions">
        {iiPrincipal && (
          <>
            <button className="btn-primary" onClick={handleRequest}>Request Access</button>
            <button className="btn-secondary" onClick={handleDownload}>Download</button>
          </>
        )}
        {message && <p className="detail-message">{message}</p>}
      </div>
    </div>
  );
}
