// src/components/HeroTile.jsx

import React from "react";
import "./heroTile.scss"; // osobne style dla kafelka

export default function HeroTile({ icon, title, desc, onClick, color }) {
  const className = "hero-slide-tile" + (!icon ? " no-img" : "");
  return (
    <div className={className} onClick={onClick} style={{ background: color }}>
      {title && <div className="hero-slide-tile-title">{title}</div>}
      {icon && <img src={icon} alt={title} />}
      <div className="hero-slide-tile-desc">{desc}</div>
    </div>
  );
}