// HowItWorksDesktop.jsx

import React from "react";
import "./processDesktop.scss";

const steps = [
  {
    icon: "/assets/icons/tel.png", // podmień na swoje pliki SVG/PNG
    label: "Zadzwoń lub zgłoś online",
  },
  {
    icon: "/assets/icons/fach.png",
    label: "Fachowiec sprawdza problem",
  },
  {
    icon: "/assets/icons/basket.png",
    label: "Kupujemy potrzebne materiały",
  },
  {
    icon: "/assets/icons/thumbup.png",
    label: "Gotowe",
  },
];

export default function HowItWorksDesktop() {
    return (
      <section className="howitworks-desktop-root" id="opinie">
        <h2 className="howitworks-desktop-title">Jak działamy?</h2>
        <div className="howitworks-desktop-desc">
          Proces realizacji usługi jest maksymalnie prosty i szybki!
        </div>
        <div className="howitworks-desktop-steps">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="howitworks-desktop-step">
                <div className="howitworks-desktop-step-icon">
                  <img src={step.icon} alt={step.label} />
                </div>
                <div className="howitworks-desktop-step-label">{step.label}</div>
              </div>
              {i < steps.length - 1 && (
                <span className="howitworks-arrow">›</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    );
  }
