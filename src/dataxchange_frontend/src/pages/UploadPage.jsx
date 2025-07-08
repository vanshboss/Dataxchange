// src/pages/UploadPage.jsx
import React, { useState } from "react";
import { uploadDataset } from "../services/api";
import "../styles/upload.css";

export default function UploadPage() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    price: "",
    wallet_address: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.price || !form.wallet_address) {
      setStatus("❌ Please fill in all fields.");
      return;
    }

    setStatus("⏳ Uploading...");

    try {
      const id = await uploadDataset(form);
      setStatus(`✅ Dataset uploaded! ID: ${id}`);
      setForm({ title: "", content: "", price: "", wallet_address: "" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to upload dataset.");
    }
  };

  return (
    <div className="upload-wrapper">
      <h1>📤 Upload Dataset</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content (raw text or summary)" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price in ICP" type="number" />
        <input name="wallet_address" value={form.wallet_address} onChange={handleChange} placeholder="Your ICP Wallet Address" />
        <button type="submit">Upload</button>
      </form>
      <div className="status-message">{status}</div>
    </div>
  );
}
