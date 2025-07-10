import React, { useMemo } from "react";
import "./heroSlide.scss";
import HeroTile from "../../components/HeroTile/HeroTile"; // import nowego kafelka
import heroTiles from "../../components/heroTilesData.js";

// Własna prosta funkcja shuffle (możesz zamienić na lodash.shuffle)
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Przykładowe dane kafelków:


export default function HeroSlide() {
  // Losowo ułóż kafelki przy każdym montowaniu
  const shuffledTiles = useMemo(() => shuffle(heroTiles), []);
  


  const scrollToTiles = () => {
    const section = document.getElementById("hero-tiles");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-slide-root">
      <video
        className="hero-slide-bg"
        src="/assets/0629.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/bg-blur.jpg"
      />
      <div className="hero-slide-overlay">
        <div className="hero-menu">
            <button className="hero-menu-button" onClick={scrollToTiles}>
                USŁUGI
            </button>
            <button className="hero-menu-button">
                DIY
            </button>
            <button className="hero-menu-button">
            <span style={{fontWeight: 100}}>O</span><span style={{fontWeight: 700}}>NAS</span>
            </button>
        </div>
        <div className="hero-slide-slider">
          {shuffledTiles.map(tile => (
            <HeroTile
            key={tile.id}
            icon={tile.icon}
            title={tile.title}
            desc={tile.desc}
            color={tile.color} 
            onClick={scrollToTiles} 
          />
          ))}
        </div>
        <div className="hero-button">
            <img className="hero-phone-icon" src="/assets/Phone.png" alt="phone" />
            <span className="hero-phone-number">690 029 414</span>
        </div>


      </div>
    </div>
  );
}
