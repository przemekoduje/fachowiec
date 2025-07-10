// src/fachowiec/pages/Desktop/HeroDesktop.jsx
import React from "react";
import "./heroDesktop.scss";
import MenuDesktop from "../../components/MenuDesktop/MenuDesktop";

export default function HeroDesktop() {
  return (
    <>
      <MenuDesktop />
      <section className="hero-desktop-root">
        <div className="hero-desktop-container">
          <div className="hero-desktop-illustration">
            <img
              src="/assets/desktop/fachowiec.png" // <- Podmień na swój plik!
              alt="Fachowiec na telefon"
              className="hero-desktop-image"
            />
          </div>
          <div className="hero-desktop-content">
            <h1 className="hero-desktop-title">
              Fachowiec
              <br />
              na żądanie
              <br />w Gliwicach
            </h1>
            <div className="hero-desktop-actions">
              <button
                className="hero-desktop-btn hero-desktop-order"
                onClick={() => {
                  const el = document.getElementById("uslugi");
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Zamów usługę
              </button>
              <a
                href="tel:690029414"
                className="hero-desktop-btn hero-desktop-phone"
              >
                <span className="hero-desktop-phone-icon" />
                690 029 414
              </a>
            </div>
            <div className="hero-desktop-slogan"> Szybko i uczciwie</div>
          </div>
        </div>
      </section>
    </>
  );
}
