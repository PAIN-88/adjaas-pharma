import React, { useEffect, useState } from "react";

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides || slides.length === 0) {
    return (
      <div className="hero-slide" style={{ background: "var(--color-teal)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1>Welcome</h1>
      </div>
    );
  }

  const current = slides[index];

  return (
    <div className="hero-slide" style={{ ...slideBase, backgroundImage: `url(${current.image})` }}>
      <div style={overlayStyle}>
        {current.title && <h1 style={{ color: "#fff" }}>{current.title}</h1>}
      </div>
      <div style={dotsStyle}>
        {slides.map((s, i) => (
          <span
            key={s.id}
            onClick={() => setIndex(i)}
            style={{
              ...dotStyle,
              background: i === index ? "var(--color-primary)" : "#fff",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const slideBase = {
  position: "relative",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const overlayStyle = {
  background: "rgba(0,0,0,0.25)",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const dotsStyle = { position: "absolute", bottom: 16, display: "flex", gap: 8 };
const dotStyle = { width: 10, height: 10, borderRadius: "50%", cursor: "pointer", border: "1px solid #ccc" };