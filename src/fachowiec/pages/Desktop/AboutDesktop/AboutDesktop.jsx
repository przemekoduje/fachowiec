import React from "react";
import "./aboutDesktop.scss";

export default function AboutDesktop() {
  return (
    <section className="about-desktop-root" id="onas">
      <h2 className="about-desktop-title">O nas</h2>
      <div className="about-desktop-desc">
        U nas każdy fachowiec ma nie tylko narzędzia, ale i dystans do siebie! Naprawiamy, montujemy, doradzamy –
        czasem z kawą w ręku, czasem z instrukcją do góry nogami, a zawsze z uśmiechem.<br />
        Bo najlepsza ekipa to taka, która umie pomóc…
      </div>
      <div className="about-desktop-illustration-wrap">
        <img
          className="about-desktop-illustration"
          src="/assets/desktop/aboutDesktop.png"
          alt="Ekipa fachowców"
        />
      </div>
    </section>
  );
}
