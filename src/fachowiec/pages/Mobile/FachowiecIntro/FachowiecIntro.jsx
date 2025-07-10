import React, { useState, useRef, useEffect } from "react";
import "./fachowiecIntro.scss";
import userPhoto from "../../../assets/profil2.jpg";
import logoF from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function FachowiecIntro() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [flip, setFlip] = useState(false);
  const videoRef = useRef();
  const navigate = useNavigate();

  const videoSrc = "/assets/0629.mp4";
  const bgImage = "/assets/bg-blur.jpg";
  const loadStartRef = useRef(Date.now());
  const link = "/assets/Link.png";

  function finishLoading() {
    const now = Date.now();
    const minDuration = 2000;
    const elapsed = now - loadStartRef.current;
    if (elapsed >= minDuration) {
      setLoading(false);
    } else {
      setTimeout(() => setLoading(false), minDuration - elapsed);
    }
  }

  const handleCanPlayThrough = () => {
    finishLoading();
    // setStep(0);
  };

  // --- NIE UŻYWAMY już auto-przejścia po 5 sekundach! ---

  // Obsługa kliknięcia na całym ekranie (tylko w step 0)
  const handleRootClick = () => {
    if (!loading && step === 0) {
      setFlip(true);
      setTimeout(() => setStep(1), 600);
    }
  };

  return (
    <div className="fachowiec-intro-root" onClick={handleRootClick}>
      <video
        ref={videoRef}
        className="fachowiec-bg-video"
        src={videoSrc}
        autoPlay
        muted
        loop={true}
        playsInline
        poster={bgImage}
        onCanPlayThrough={handleCanPlayThrough}
      />

      {/* PRELOADER */}
      {loading && (
        <div className="fachowiec-preloader">
          <div className="fachowiec-logo">
            <img src={logoF} alt="Fachowiec logo" />
          </div>
          <div className="fachowiec-slogan">Twoje domowe SOS</div>
        </div>
      )}

      {/* STEP 0 – info box */}
      {!loading && step === 0 && (
        <div className="fachowiec-info-tile">
          <div className="fachowiec-info-box">
            <div className="fachowiec-main-title">FACHOWIEC</div>
            <div className="fachowiec-location">
              NA ŻĄDANIE<br />W GLIWICACH
            </div>
          </div>
          <button className="fachowiec-cta-btn disabled"
          onClick={e => { e.stopPropagation(); navigate("/hero"); }}
          >
          <img src={link} alt="" style={{ width: 18, height: 18, marginRight: 8, verticalAlign: "middle" }} />
            dowiedz sie więcej
            </button>
        </div>
      )}

      {/* STEP 1 – CTA z formularzem */}
      {!loading && step === 1 && (
        <div className="fachowiec-info-tile">
          <div className="fachowiec-cta-box">
            <img className="fachowiec-avatar" src={userPhoto} alt="Twoje zdjęcie" />
            <div className="fachowiec-cta-desc">
              Czas to Twój luksus.<br />
              Zostaw numer – oddzwonimy<br />
              zanim Twoja usterka zacznie żyć własnym życiem
            </div>
            <form className="fachowiec-phone-form" onSubmit={e => { e.preventDefault(); alert('Oddzwonimy!'); }}>
              <input type="tel" name="telefon" placeholder="telefon" required />
              <button type="submit">Wyślij</button>
            </form>
          </div>
          <button className="fachowiec-skip-btn"
          onClick={e => { e.stopPropagation(); navigate("/hero"); }}
          >
            pomiń</button>
        </div>
      )}
    </div>
  );
}
