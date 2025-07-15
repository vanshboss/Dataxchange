// src/pages/ContactPage.jsx
import React, { useState } from "react";
import AnimatedButton from "../components/AnimatedButton";
import "../styles/contact.css";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("❌ Please fill out all fields.");
      return;
    }
    setStatus("✅ Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>📬 Contact Us</h1>
      <p>If you have questions or need support, feel free to reach out.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Your Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Your Email"
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          value={form.message}
          placeholder="Your Message"
          rows="5"
          onChange={handleChange}
          required
        ></textarea>
        <AnimatedButton type="submit">Send Message</AnimatedButton>
      </form>

      {status && <p className="contact-status">{status}</p>}

      <div className="contact-info">
        <h2>📞 Contact Info</h2>
        <p><strong>Email:</strong> support@dataxchange.io</p>
        <p><strong>Phone:</strong> +91 9876543210</p>
        <p><strong>Address:</strong> Hyderabad, Telangana, India</p>
      </div>
    </div>
  );
}
