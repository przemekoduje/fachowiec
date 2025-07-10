import React from "react";
import "./popupForm.scss";
import { useEffect } from "react";

export default function PopupForm({
  tile,
  issues,
  onAddIssue,
  onRemoveIssue,
  onOrder,
  onClose,
}) {
  useEffect(() => {
    const handleResize = () => {
      // Scrolluj popup-form-content na top (gdy zmienia się rozmiar viewportu, np. zamknięcie klawiatury)
      const el = document.querySelector(".popup-form-content");
      if (el) el.scrollTop = 0;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="popup-form-backdrop" onClick={onClose}>
      <div className="popup-form-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-form-close" onClick={onClose}>
          ×
        </button>
        <div className="popup-form-title">Wprowadź zgłoszenie</div>
        <form>
          <input type="text" placeholder="Imię i Nazwisko" />
          <input type="tel" placeholder="Telefon" />
          <input type="text" placeholder="Adres" />
          <div className="popup-form-label">Zgłaszam usterkę</div>
          <div className="popup-form-tags">
            {/* Lista wszystkich zgłoszonych usterek */}
            {issues.map((iss, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#f6f6f6",
                  borderRadius: "8px",
                  padding: "2px 8px",
                  marginRight: 7,
                }}
              >
                {iss.title}
                {iss.desc && <> • {iss.desc}</>}
                <button
                  type="button"
                  onClick={() => onRemoveIssue(i)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#cc4444",
                    marginLeft: 5,
                    fontSize: "1em",
                    cursor: "pointer",
                    opacity: 0.7,
                  }}
                  title="Usuń"
                >
                  Usuń
                </button>
              </span>
            ))}
            {/* Ostatnia aktualnie wybrana */}
            {tile && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#e8f6fa",
                  borderRadius: "8px",
                  padding: "2px 8px",
                }}
              >
                {tile.title}
                {tile.desc && <> • {tile.desc}</>}
                <button
                  type="button"
                  onClick={onClose} // tylko zamyka popup!
                  style={{
                    background: "none",
                    border: "none",
                    color: "#cc4444",
                    marginLeft: 5,
                    fontSize: "1em",
                    cursor: "pointer",
                    opacity: 0.7,
                  }}
                  title="Usuń"
                >
                  Usuń
                </button>
              </span>
            )}
          </div>
          <textarea placeholder="Notatka dla fachowca" />
          <div className="popup-form-buttons">
            <button type="button" className="outline" onClick={onAddIssue}>
              Dodaj usterkę
            </button>
            <button type="button" className="solid" onClick={onOrder}>
              Zamawiam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
