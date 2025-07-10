import React, { useState } from "react";
import "./diyDesktop.scss";

const diyList = [
  {
    id: 1,
    title: "Perlator – mały gadżet, wielka oszczędność w Twoim kranie",
    intro: "Czy wiesz, że istnieje mały niepozorny gadżet, który potrafi zmniejszyć zużycie wody nawet o połowę i uczynić mycie rąk przyjemniejszym? Brzmi jak magia dla hydraulików! Spokojnie – mowa o perlatorze, czyli sitku w kranie.",
    content: (
      <>
        <h4>Wstęp</h4>
        <p>Czy wiesz, że istnieje mały niepozorny gadżet...</p>
        <h4>Co to jest perlator i dlaczego warto go mieć?</h4>
        <p>Perlator (perlektor kranowy)...</p>
      </>
    ),
    color: "#F9F4F1",
    activeColor: "#FDE8DE"
  },
  {
    id: 2,
    title: "Jak wymienić uszczelkę w kranie?",
    intro: "Cieknący kran nie pozwala spać? Zrobisz to sam w 10 minut.",
    content: (
      <>
        <h4>Wstęp</h4>
        <p>Wymiana uszczelki w kranie to jeden z najprostszych domowych trików...</p>
      </>
    ),
    color: "#EAF7F5",
    activeColor: "#A4D8CE"
  },
  {
    id: 3,
    title: "Bezpieczna wymiana gniazdka",
    intro: "Elektryka nie gryzie! O ile wyłączysz prąd…",
    content: (
      <>
        <h4>Jak wymienić gniazdko?</h4>
        <p>Pamiętaj o wyłączeniu bezpieczników! ...</p>
      </>
    ),
    color: "#F1F4F9",
    activeColor: "#C5D6E7"
  },
  {
    id: 4,
    title: "Montaż czujki dymu",
    intro: "Prosta ochrona domu. Samodzielnie w 5 minut.",
    content: (
      <>
        <h4>Czujka dymu DIY</h4>
        <p>Zadbaj o bezpieczeństwo – czujnik zamontujesz samodzielnie bez wiercenia...</p>
      </>
    ),
    color: "#F7F4E7",
    activeColor: "#F7EDCA"
  },
  {
    id: 5,
    title: "Usuwanie zapachu z lodówki",
    intro: "Soda, cytryna czy kawa? Poznaj fachowe patenty.",
    content: (
      <>
        <h4>Domowe sposoby</h4>
        <p>Wystarczy garść sody lub plasterek cytryny, by…</p>
      </>
    ),
    color: "#E6F3F7",
    activeColor: "#D0EBFA"
  },
  {
    id: 6,
    title: "Czym czyścić prysznic bez szorowania",
    intro: "Sposoby fachowca na błysk bez chemii.",
    content: (
      <>
        <h4>Ekologiczne porady</h4>
        <p>Wystarczy ocet i gąbka!...</p>
      </>
    ),
    color: "#F1E6F7",
    activeColor: "#D7BFF2"
  },
  {
    id: 7,
    title: "Czym poradzić sobie z problemamia",
    intro: "Sposoby fachowca na błysk bez chemii.",
    content: (
      <>
        <h4>Ekologiczne porady</h4>
        <p>Wystarczy ocet i gąbka!...</p>
      </>
    ),
    color: "#F1E6F7",
    activeColor: "#D7BFF2"
  },
  {
    id: 8,
    title: "Czym poradzić sobie z problemamia",
    intro: "Sposoby fachowca na błysk bez chemii.",
    content: (
      <>
        <h4>Ekologiczne porady</h4>
        <p>Wystarczy ocet i gąbka!...</p>
      </>
    ),
    color: "#F1E6F7",
    activeColor: "#D7BFF2"
  },
  {
    id: 9,
    title: "Czym poradzić sobie z problemamia",
    intro: "Sposoby fachowca na błysk bez chemii.",
    content: (
      <>
        <h4>Ekologiczne porady</h4>
        <p>Wystarczy ocet i gąbka!...</p>
      </>
    ),
    color: "#F1E6F7",
    activeColor: "#D7BFF2"
  },
  {
    id: 10,
    title: "Czym poradzić sobie z problemamia",
    intro: "Sposoby fachowca na błysk bez chemii.",
    content: (
      <>
        <h4>Ekologiczne porady</h4>
        <p>Wystarczy ocet i gąbka!...</p>
      </>
    ),
    color: "#F1E6F7",
    activeColor: "#D7BFF2"
  },
];

export default function DIY() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="diy-desktop-root" id="diy">
        <div className="diy-desktop-header">
    <h2>DIY</h2>
    <div className="diy-desktop-subtitle">zrób to sam</div>
  </div>
      <div className="diy-desktop-cols">
        {/* Kafelki z tematami */}
        <div className="diy-desktop-tiles">
          {diyList.map((item, idx) => (
            <div
              key={item.id}
              className={
                "diy-desktop-tile" + (selected === idx ? " active" : "")
              }
              style={{
                background: selected === idx ? item.activeColor : item.color,
                cursor: selected === idx ? "default" : "pointer",
              }}
              onClick={() => setSelected(idx)}
            >
              <span className="diy-desktop-tile-title">{item.title}</span>
              
            </div>
          ))}
        </div>
        {/* Szczegóły wybranej porady */}
        <div className="diy-desktop-detail">
          <div className="diy-desktop-detail-title">
            {diyList[selected].title}
          </div>
          <span className="diy-desktop-tile-intro">{diyList[selected].intro}</span>
          <div className="diy-desktop-detail-content">
            {diyList[selected].content}
          </div>
        </div>
      </div>
    </section>
  );
}
