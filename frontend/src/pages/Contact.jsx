import React, { useState, useEffect } from "react";
import { submitContact, getCompanyInfo } from "../api";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getCompanyInfo().then((r) => setCompany(r.data)).catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContact(form);
      setStatus("sent");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="container two-col-section" style={{ padding: "60px 20px" }}>
      <div>
        <h1>Contact Us</h1>
        <p><strong>Address:</strong> {company?.address}</p>
        <p><strong>Phone:</strong> {company?.phone}</p>
        <p><strong>Email:</strong> {company?.email}</p>
      </div>

      <div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required style={inputStyle} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} style={inputStyle} />
          <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} style={inputStyle} />
          <textarea name="message" placeholder="Message" rows={5} value={form.message} onChange={handleChange} required style={inputStyle} />
          <button type="submit" className="btn">Send Message</button>
          {status === "sent" && <p style={{ color: "green" }}>Message sent successfully!</p>}
          {status === "error" && <p style={{ color: "crimson" }}>Something went wrong. Please try again.</p>}
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid #ccc",
  borderRadius: 4,
  fontSize: 14,
};