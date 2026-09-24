import React, { useEffect, useState } from "react";
import { getCompanyInfo } from "../api";
import doctorsTeam from "../assets/doctors-team.jpg";

export default function About() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getCompanyInfo().then((r) => setCompany(r.data)).catch(() => {});
  }, []);

  return (
    <div className="container" style={{ padding: "60px 20px" }}>
      <h1>About {company?.company_name || "Us"}</h1>
      <p style={{ lineHeight: 1.8, color: "#444" }}>{company?.welcome_text}</p>

      <img
        src={doctorsTeam}
        alt="Our team"
        style={{ width: "100%", maxHeight: 380, objectFit: "cover", borderRadius: 8, margin: "24px 0" }}
      />

      <h2 id="vision" style={{ marginTop: 40 }}>Vision & Values</h2>
      <p style={{ lineHeight: 1.8, color: "#444" }}>{company?.why_choose_text}</p>
    </div>
  );
}
