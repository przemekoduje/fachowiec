import React, { useState } from "react";
import PopupForm from "../../components/PopupForm/PopupForm";
import heroTiles from "../../components/heroTilesData.js";
import "./heroTiles.scss";
import HeroTile2 from "../../components/Herotile2/HeroTile2";
import { db } from "../../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function HeroTiles() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedTile, setSelectedTile] = useState(null);
  const [issues, setIssues] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);

  // Wyślij zgłoszenie
  const handleOrder = async (formData) => {
    // Dodaj jeszcze niezatwierdzoną usterkę jeśli istnieje
    let allIssues = issues;
    if (selectedTile) {
      const already = issues.some(
        (iss) =>
          iss.title === selectedTile.title && iss.desc === selectedTile.desc
      );
      if (!already) {
        allIssues = [
          ...issues,
          { title: selectedTile.title, desc: selectedTile.desc },
        ];
      }
    }
    try {
      await addDoc(collection(db, "zgloszenia"), {
        ...formData,
        issues: allIssues,
        created: serverTimestamp(),
      });
      setIssues([]);
      setFormFields({ name: "", phone: "", address: "", note: "" });
      setPopupOpen(false);
      setSelectedTile(null);
      setSuccessPopupOpen(true); // Otwórz popup z sukcesem
    } catch (e) {
      alert("Błąd przy wysyłce");
      console.error(e);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormFields((prev) => ({ ...prev, [field]: value }));
  };

  const openPopup = (tile) => {
    setSelectedTile(tile);
    setPopupOpen(true);
  };

  const handleAddIssue = () => {
    if (selectedTile) {
      setIssues((prev) => [
        ...prev,
        { title: selectedTile.title, desc: selectedTile.desc },
      ]);
    }
    setPopupOpen(false);
    setSelectedTile(null);
  };

  const handleRemoveIssue = (idx) => {
    setIssues((prev) => prev.filter((_, i) => i !== idx));
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedTile(null);
  };

  return (
    <div className="hero-tiles-root">
      <div className="herotiles-head">
        <span>z czym masz</span> <span className="blue">kłopot ?</span>
      </div>
      <div className={`hero-tiles-grid${popupOpen ? " blurred" : ""}`}>
        {heroTiles.map((tile) => (
          <HeroTile2
            key={tile.id}
            icon={tile.icon}
            title={tile.title}
            desc={tile.desc}
            color={tile.color}
            onClick={() => openPopup(tile)}
          />
        ))}
      </div>
      {popupOpen && (
        <PopupForm
          tile={selectedTile}
          issues={issues}
          onAddIssue={handleAddIssue}
          onRemoveIssue={handleRemoveIssue}
          onOrder={handleOrder} // <- ten handleOrder ZOSTAJE!
          onClose={closePopup}
          name={formFields.name}
          phone={formFields.phone}
          address={formFields.address}
          note={formFields.note}
          onFieldChange={handleFieldChange}
        />
      )}
      {/* Popup potwierdzenia wysyłki */}
      {successPopupOpen && (
        <div
          className="popup-form-backdrop"
          onClick={() => setSuccessPopupOpen(false)}
        >
          <div
            className="popup-backdrop-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-backdrop-title">Zgłoszenie wysłane</div>
            <p>
              Twoje zgłoszenie już do nas trafiło.
              <br />
              Zaraz ktoś od nas zadzwoni (daj nam 5 min).
              <br />
              Nie chcesz czekać? Dzwoń proszę
              <br />
            </p>
            <a href="tel:690029414" className="popup-backdrop-btn phone">
              <span className="hero-desktop-phone-icon" />
              690 029 414
            </a>
            <button
              className="popup-backdrop-btn solid"
              onClick={() => setSuccessPopupOpen(false)}
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
