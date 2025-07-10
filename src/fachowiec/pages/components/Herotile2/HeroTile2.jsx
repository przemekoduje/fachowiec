// HeroTile2.jsx (siatka)
import React from "react";
import "./heroTile2.scss";

export default function HeroTile2({ icon, title, desc, color, onClick }) {
  const isTextOnly = !icon;

  return (
    <div
      className={`hero-tile-grid${isTextOnly ? " no-img" : ""}`}
      style={{ background: color }}
      onClick={onClick}
    >
      {title && <div className="hero-tile-title">{title}</div>}
      <div className="hero-tile-img-wrap">
        {icon && <img src={icon} alt={title} />}
      </div>
      {desc && (
        <div className="hero-tile-desc">
          {isTextOnly
            ? desc
                .split(/ {2,}/) // rozdziel po dwóch (lub więcej) spacjach
                .map((line, i) => <div key={i}>{line.trim()}</div>)
            : desc}
        </div>
      )}
    </div>
  );
}
