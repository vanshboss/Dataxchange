// src/pages/UploadPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { uploadDataset } from "../services/api";
import { UserContext } from "../context/UserContext";
import AnimatedButton from "../components/AnimatedButton";
import "../styles/upload.css";

export default function UploadPage() {
  const { iiPrincipal, loading } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState(null);
  const [walletValid, setWalletValid] = useState(false);

  const allowedTypes = [
    "application/pdf",
    "text/plain",
    "application/json",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const isValidWallet = (addr) => /^[A-Za-z0-9]{25}$/.test(addr);

  useEffect(() => {
    if (!loading && !iiPrincipal) {
      setStatus("🔐 Please login first to upload a dataset.");
    }
  }, [loading, iiPrincipal]);

  const handleWalletChange = (e) => {
    const val = e.target.value.trim();
    setWalletAddress(val);
    setWalletValid(isValidWallet(val));
  };

  const handleWalletPaste = (e) => {
    e.preventDefault(); // Prevent pasting for wallet validation
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !file || !price || !walletAddress) {
      setStatus("❌ Please fill all fields.");
      return;
    }

    if (!allowedTypes.includes(file?.type)) {
      setStatus("❌ Invalid file type. Allowed: CSV, Excel, JSON, TXT, PDF.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setStatus("❌ File too large. Max 2MB.");
      return;
    }

    if (!isValidWallet(walletAddress)) {
      setStatus("❌ Invalid wallet address. Must be 25 characters.");
      return;
    }

    setStatus("⏳ Uploading...");

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const arrayBuffer = reader.result;
        const uint8array = new Uint8Array(arrayBuffer);

        const id = await uploadDataset({
          title,
          category,
          file: uint8array,
          price: Number(price),
          wallet_address: walletAddress,
        });

        setStatus(`✅ Uploaded successfully! Dataset ID: ${id}`);
        setTitle("");
        setCategory("");
        setPrice("");
        setWalletAddress("");
        setWalletValid(false);
        setFile(null);
      } catch (err) {
        console.error("Upload error:", err);
        setStatus("❌ Upload failed. Make sure you're logged in and try again.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  if (loading) return <p className="loading">⏳ Checking login status…</p>;
  if (!iiPrincipal) return <p className="loading">🔐 Please login to access this page.</p>;

  return (
    <div className="upload-wrapper">
      <h2>🗃️ Upload Your Dataset</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Dataset Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".csv, .xlsx, .json, .pdf, .txt"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <input
          type="number"
          placeholder="Price (ICP)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Wallet Address"
            value={walletAddress}
            onChange={handleWalletChange}
            onPaste={handleWalletPaste}
            required
            style={{ paddingRight: "2rem" }}
          />
          {walletValid && (
            <span
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "green",
                fontSize: "1.2rem",
              }}
            >
              ✅
            </span>
          )}
        </div>
        <AnimatedButton type="submit">Upload</AnimatedButton>
      </form>
      {status && <p className="upload-status">{status}</p>}
    </div>
  );
}
