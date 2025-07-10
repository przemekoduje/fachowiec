import React, { useState } from "react";
import "./menuDesktop.scss";

const menuLinks = [
  { id: 1, label: "USŁUGI", href: "#uslugi" },
  { id: 2, label: "OPINIE", href: "#opinie" },
  { id: 3, label: "O NAS", href: "#onas" },
  { id: 4, label: "DIY", href: "#diy" },
  { id: 5, label: "FAQ", href: "#faq" },
];

export default function HeroNavbar() {
  const [hovered, setHovered] = useState(null); // na hover
  const [active, setActive] = useState(null);   // nie zaznaczamy domyślnie nic

  return (
    <nav className="hero-navbar">
      <div className="hero-navbar-logo">
        <img src="/assets/logo.png" alt="Fachowiec.online" />
      </div>
      <div className="hero-navbar-menu">
        {menuLinks.map((link) => {
          const isActive = hovered === link.id || active === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              onMouseEnter={() => setHovered(link.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActive(link.id)}
              style={{
                background: isActive ? "#fcf6ea" : "transparent",
                color: "#272727",
                fontWeight: isActive ? 500 : 400,
                borderRadius: isActive ? "12px 12px 0 0" : "12px 12px 0 0",
                boxShadow: isActive ? "0 2px 12px #cab75d15" : "none",
                padding: "0 22px",
                minHeight: "140px",           // pełna wysokość navbara!
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.22s, box-shadow 0.19s, color 0.18s",
                textDecoration: "none",
                border: "none",
                outline: "none",
                cursor: "pointer",
                letterSpacing: "0.04em",
                marginTop: 0,
              }}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
